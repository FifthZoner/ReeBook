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
}