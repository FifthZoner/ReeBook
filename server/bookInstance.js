const {BookInstanceCollection, BookInfoCollection, UserCollection} = require("./database");
const bodyParser = require("body-parser");
const session = require("express-session");
module.exports = function(app) {

    app.put("/api/bookInstance/add", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({ _id: req.session.userId });
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(500).json({ error: "Could not get user info! Is session valid?" });
                return;
            }
            const { bookID } = req.body;
            const bookCheck = await BookInfoCollection.findOne({ "_id" : bookID });
            console.log(bookCheck, bookID);
            if (bookCheck === null || bookCheck === undefined) {
                console.error("Book with that id doesn't exist!");
                res.status(500).json({ error: "Book info for that id does not exist!" });
                return;
            }
            const book = new BookInstanceCollection(
                {
                    "bookID": bookID, "ownerID" : user._id
                })
            await book.save();

            res.status(256).json({ "response": "Added a new book instance!" });
        }
        catch (err) {
            console.error("Error when adding book instance:", err);
            res.status(500).json({ error: "Error when adding book instance!" });
        }
    });

    app.delete("/api/bookInstance/delete", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({ _id: req.session.userId });
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(500).json({ error: "Could not get user info! Is session valid?" });
                return;
            }
            const { instanceID } = req.body;
            const book = await BookInstanceCollection.findOne({ "_id" : instanceID });
            console.log(book);
            if (book == null || book === undefined) {
                console.error("Instance with that id doesn't exist!");
                res.status(500).json({ error: "Book instance for that id does not exist!" });
                return;
            }
            if (user.other.accessLevel === false && user._id !== book.ownerID) {
                console.error("User without permissions tried to delete a book!");
                res.status(500).json({ error: "Not permitted to delete this book!" });
                return;
            }
            if (book.holderID !== "" && book.holderID !== user._id) {
                console.error("User does not possess this book instance as of now!");
                res.status(500).json({ error: "Not permitted to delete a book instance that is held by other user!" });
                return;
            }
            await book.deleteOne();

            res.status(256).json({ "response": "Deleted a book instance!" });
        }
        catch (err) {
            console.error("Error when deleting book instance:", err);
            res.status(500).json({ error: "Error when deleting book instance!" });
        }
    });

    app.get("/api/bookInstance/getAll", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({ _id: req.session.userId });
            if (user === undefined || user == null) {
                console.error("User without session tried get their instances!");
                res.status(500).json({ error: "Could not get user info! Is session valid?" });
                return;
            }

            const instances = await BookInstanceCollection.find({ "ownerID" : req.session.userId });
            if (instances.length === 0) {
                console.log("User with no books");
                res.status(200).json({ "booksAmount" : 0, "instancesAmount": 0, "lentAmount": 0 });
                return;
            }
            const instancesAmount = instances.length;
            let lentAmount = 0;
            let uniqueBooks = [];
            for (let n = 0; n < instancesAmount; n++) {
                let addLent = 0;
                if (instances[n].ownerID !== instances[n].holderID && instances[n].holderID !== "") {
                    lentAmount++;
                    addLent = 1;
                }
                let addBook = true;
                for (m in uniqueBooks) {
                    if (m[0] == instances[n].bookID) {
                        m[1]++;
                        m[2] += addLent;
                        addBook = false;
                        break;
                    }
                }
                if (addBook) {
                    bookInfo = await BookInfoCollection.findOne({"_id" : instances[n].bookID})
                    if (bookInfo === undefined || bookInfo == null) {
                        console.error("Cannet get book info!");
                        res.status(500).json({ error: "An internal problem with getting book info appeared!" });
                        return;
                    }
                    uniqueBooks.push({"bookID" : instances[n].bookID, "bookInfo" : bookInfo.identification, "totalAmount" : 1, "lentAmount" : addLent})
                }
            }

            res.status(200).json({ "booksAmount" : uniqueBooks.length, "instancesAmount": instancesAmount, "lentAmount": lentAmount, uniqueBooks });
        }
        catch (err) {
            console.error("Error when returning user instances:", err);
            res.status(500).json({ error: "Error when returning user instances!" });
        }
    });

    app.get("/api/bookInstance/getBorrowed", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({ _id: req.session.userId });
            if (user === undefined || user == null) {
                console.error("User without session tried get their instances!");
                res.status(400).json({ error: "Could not get user info! Is session valid?" });
                return;
            }

            const instances = await BookInstanceCollection.find({ "holderID" : req.session.userId });
            if (instances.length === 0) {
                console.log("User with no books borrowed");
                res.status(200).json({ "booksAmount" : 0, "instancesAmount": 0, "lentAmount": 0 });
                return;
            }
            const instancesAmount = instances.length;
            let lentAmount = 0;
            let uniqueBooks = [];
            for (let n = 0; n < instancesAmount; n++) {
                let addLent = 0;
                if (instances[n].ownerID !== instances[n].holderID && instances[n].holderID !== "") {
                    lentAmount++;
                    addLent = 1;
                }
                let addBook = true;
                for (m in uniqueBooks) {
                    if (m[0] == instances[n].bookID) {
                        m[1]++;
                        m[2] += addLent;
                        addBook = false;
                        break;
                    }
                }
                if (addBook) {
                    bookInfo = await BookInfoCollection.findOne({"_id" : instances[n].bookID})
                    if (bookInfo === undefined || bookInfo == null) {
                        console.error("Cannet get book info!");
                        res.status(400).json({ error: "An internal problem with getting book info appeared!" });
                        return;
                    }
                    uniqueBooks.push({"bookID" : instances[n].bookID, "bookInfo" : bookInfo.identification, "totalAmount" : 1, "lentAmount" : addLent})
                }
            }

            res.status(200).json({ "booksAmount" : uniqueBooks.length, "instancesAmount": instancesAmount, "lentAmount": lentAmount, uniqueBooks });
        }
        catch (err) {
            console.error("Error when returning user borrowed instances:", err);
            res.status(500).json({ error: "Error when returning user borrowed instances!" });
        }
    });
}