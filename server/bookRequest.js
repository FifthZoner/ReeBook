//fconst session = require("express-session");
const {BookInstanceCollection, BookRequestCollection, UserCollection} = require("./database");
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
            if (bookCheck.holderID !== bookCheck.ownerID && bookCheck.holderID !== "") {
                console.error("Book has no owner!");
                res.status(500).json({ error: "Book info for that id does not exist!" });
                return;
            }
            const { days } = req.body;
            if (days < 0) {
                console.error("Days can not be negative!");
                res.status(500).json({ error: "Days has the wrong value!" });
                return;
            }
            const book = new BookRequestCollection(
                {
                    "instanceID": instanceID, "askerID": req.session.userId, "targetID": bookCheck.ownerID,
                    "requestDate": new Date(), "days": days
                })
            await book.save();

            res.status(256).json({ "response": "Added a new request!" });
        }
        catch (err) {
            console.error("Error when returning book info list:", err);
            res.status(500).json({ error: "Error when returning book info list!" });
        }
    });



}