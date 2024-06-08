//fconst session = require("express-session");
const {BookInstanceCollection, BookRequestCollection, UserCollection, BookInfoCollection} = require("./database");
const bodyParser = require("body-parser");
const session = require("express-session");
module.exports = function(app) {
    app.put("/api/bookRequest/add", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({ _id: req.session.userId });
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(500).json({ error: "Could not get user info! Is session valid?" });
                return;
            }
            const { instanceID } = req.body;
            const bookCheck = await BookInstanceCollection.findOne({ "_id": instanceID });
            if (bookCheck === null || bookCheck === undefined) {
                console.error("Book with that id doesn't exist!");
                res.status(500).json({ error: "Book info for that id does not exist!" });
                return;
            }
            if (bookCheck.ownerID === req.session.userId) {
                console.error("Owner tried to request their own book!");
                res.status(500).json({ error: "Cannot request your own book!" });
                return;
            }
            if (bookCheck.holderID !== bookCheck.ownerID && bookCheck.holderID !== "") {
                console.error("Tried to get a book that isn't held by the owner");
                res.status(500).json({ error: "Owner does not currently hold that book!" });
                return;
            }
            const requestCheck = await BookRequestCollection.findOne({ "instanceID": instanceID, "askerID" : req.session.userId });
            if (requestCheck !== null) {
                console.error("User attempted to duplicate request!");
                res.status(500).json({ error: "Cannot submit the same request twice!" });
                return;
            }
            const { days } = req.body;
            if (days < 0) {
                console.error("Days can not be negative!");
                res.status(500).json({ error: "Days has the wrong value!" });
                return;
            }
            const request = new BookRequestCollection(
                {
                    "instanceID": instanceID, "askerID": req.session.userId, "targetID": bookCheck.ownerID,
                    "requestDate": new Date(), "days": days
                })
            await request.save();

            res.status(256).json({ "response": "Added a new request!" });
        }
        catch (err) {
            console.error("Error adding request:", err);
            res.status(500).json({ error: "Error when adding request!" });
        }
    });

    app.post("/api/bookRequest/accept", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({ _id: req.session.userId });
            if (user === undefined || user == null) {
                console.error("User without session tried accept request!");
                res.status(500).json({ error: "Could not get user info! Is session valid?" });
                return;
            }
            const { requestID } = req.body;
            const request = await BookRequestCollection.findOne({ "_id": requestID });
            if (request === undefined || request == null) {
                console.error("User tried to accept non existent request!");
                res.status(500).json({ error: "That request does not exist!" });
                return;
            }
            if (request.targetID !== req.session.userId) {
                console.error("User is not the target of this request!");
                res.status(500).json({ error: "Not the target of the request!" });
                return;
            }
            const other = await UserCollection.findOne({ _id: request.askerID });
            if (other == null) {
                console.error("Could not get info of asker!");
                res.status(500).json({ error: "Internal error!" });
                return;
            }


            const instance = await BookInstanceCollection.findOne({"_id" : request.instanceID});
            instance.holderID = request.askerID;
            instance.borrowDate = new Date();
            date = new Date();
            date.setDate(date.getDate() + request.days);
            instance.dueDate = date;
            await instance.updateOne(instance);
            other.other.borrowed += 1;
            user.other.lent += 1;
            user.updateOne(user);
            other.updateOne(other);
            await request.deleteOne(request);
            res.status(200).json({ "response": "Accepted request!" });
        }
        catch (err) {
            console.error("Error adding request:", err);
            res.status(500).json({ error: "Error when adding request!" });
        }
    });

    app.post("/api/bookRequest/decline", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({ _id: req.session.userId });
            if (user === undefined || user == null) {
                console.error("User without session tried to decline request!");
                res.status(500).json({ error: "Could not get user info! Is session valid?" });
                return;
            }
            const { requestID } = req.body;
            const request = await BookRequestCollection.findOne({ "_id": requestID });
            if (request === undefined || request == null) {
                console.error("User tried to decline non existent request!");
                res.status(500).json({ error: "That request does not exist!" });
                return;
            }
            if (request.state !== 0) {
                console.error("User tried to decline non declinable request!");
                res.status(500).json({ error: "That request has the wrong state to decline!" });
                return;
            }
            if (request.targetID !== req.session.userId) {
                console.error("User is not the target of this request!");
                res.status(500).json({ error: "Not the target of the request!" });
                return;
            }
            await request.deleteOne(request)
            res.status(256).json({ "response": "Declined request!" });
        }
        catch (err) {
            console.error("Error declining request:", err);
            res.status(500).json({ error: "Error when declining request!" });
        }
    });

    app.post("/api/returnBook", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({ _id: req.session.userId });
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(500).json({ error: "Could not get user info! Is session valid?" });
                return;
            }
            const { instanceID } = req.body;
            const bookCheck = await BookInstanceCollection.findOne({ "_id": instanceID });
            if (bookCheck === null || bookCheck === undefined) {
                console.error("Book with that id doesn't exist!");
                res.status(500).json({ error: "Book info for that id does not exist!" });
                return;
            }
            if (bookCheck.holderID === "") {
                console.error("Rried to return returned book!");
                res.status(500).json({ error: "Cannot return a free book!" });
                return;
            }
            if (bookCheck.holderID !== req.session.userId) {
                console.error("Tried to return a book that held by someone else");
                console.log(bookCheck.holderID, req.session.userId)
                res.status(500).json({ error: "User does not currently hold that book!" });
                return;
            }
            bookCheck.holderID = "";
            await bookCheck.updateOne(bookCheck)
            res.status(200).json({ "response": "Book returned!" });
        }
        catch (err) {
            console.error("Error adding return request:", err);
            res.status(500).json({ error: "Error when adding return request!" });
        }
    });

    app.get("/api/bookRequest/getAll", bodyParser.json(), async (req, res) => {
    try {
        const user = await UserCollection.findOne({ _id: req.session.userId });
        if (user === undefined || user == null) {
            console.error("User without session tried to add a book!");
            res.status(500).json({ error: "Could not get user info! Is session valid?" });
            return;
        }

        const requests = await BookRequestCollection.find({ targetID: req.session.userId });
        if (requests === undefined) {
            console.error("Error getting requests!");
            res.status(500).json({ error: "Internal server error!" });
            return;
        }

        let tab = [];

        for (let n = 0; n < requests.length; n++) {
            const asker = await UserCollection.findOne({ _id: requests[n].askerID });
            if (asker == null) {
                console.error(`Error getting asker with ID ${requests[n].askerID}!`);
                res.status(500).json({ error: "Internal server error!" });
                return;
            }

            if (!requests[n].instanceID) {
                console.error(`Missing instanceID in request with ID ${requests[n]._id}`);
                res.status(500).json({ error: "Internal server error!" });
                return;
            }

            const instance = await BookInstanceCollection.findOne({ _id: requests[n].instanceID });
            if (instance == null) {
                console.error(`Error getting instance with ID ${requests[n].instanceID}!`);
                res.status(500).json({ error: "Internal server error!" });
                return;
            }

            const info = await BookInfoCollection.findOne({ _id: instance.bookID });
            if (info == null) {
                console.error(`Error getting info for bookID ${instance.bookID}!`);
                res.status(500).json({ error: "Internal server error!" });
                return;
            }

            tab.push({
                requestID: requests[n]._id,
                instanceID: requests[n].instanceID,
                date: requests[n].requestDate,
                days: requests[n].days,
                nick: asker.credentials.nickname,
                info: info.identification
            });
        }
        res.status(200).json(tab);
    } catch (err) {
        console.error("Error adding return request:", err);
        res.status(500).json({ error: "Error when adding return request!" });
    }
});

}