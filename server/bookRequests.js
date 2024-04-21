//fconst session = require("express-session");
const {BookInstanceCollection, BookInfoCollection, UserCollection} = require("./database");
const bodyParser = require("body-parser");
const session = require("express-session");
module.exports = function(app) {

    app.use(session({
        secret: 'whatdoIwriteherepleasetellmetutorials',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    app.put("/api/bookInfo/addBare", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({_id : req.session.userId});
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(500).json({error: "Could not get user info! Is session valid?"});
                return;
            }
            if (user.other.accessLevel == 0) {
                console.error("User without permissions tried to add a book!");
                res.status(500).json({ error: "Not permitted to add a book!" });
                return;
            }

            const { name, author } = req.body;
            const book = new BookInfoCollection({"identification.name" : name, "identification.author" : author})
            await book.save();

            res.status(256).json( {"response": "Added a new book!"} );
        }
        catch (err) {
            console.error("Error when registering:", err);
            res.status(500).json({ error: "Error when registering!" });
        }
    });

    app.put("/api/bookInfo/addFull", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({_id : req.session.userId});
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(500).json({error: "Could not get user info! Is session valid?"});
                return;
            }
            if (user.other.accessLevel == 0) {
                console.error("User without permissions tried to add a book!");
                res.status(500).json({ error: "Not permitted to add a book!" });
                return;
            }

            const { name, author,  isbn, imageLink, description, releaseDate, releasePlace, distributor} = req.body;
            const book = new BookInfoCollection(
                {"identification.name" : name,
                    "identification.author" : author,
                    "identification.isbn" : isbn,
                    "identification.imageLink" : imageLink,
                    "details.description" : description,
                    "details.releaseDate" : releaseDate,
                    "details.releasePlace" : releasePlace,
                    "details.distributor" : distributor
                })
            await book.save();

            res.status(256).json( {"response": "Added a new book!"} );
        }
        catch (err) {
            console.error("Error when registering:", err);
            res.status(500).json({ error: "Error when registering!" });
        }
    });

    // gives back a list of book basic infos, for now all, limits will be added later
    app.get("/api/bookInfo/getBasics", bodyParser.json(), async (req, res) => {
        try {
            const books = await BookInfoCollection.find({});
            let infos = [];
            for (let n = 0; n < books.length; n++) {
                infos.push([books[n].identification, {"_id" : books[n]._id}]);
            }
            res.json(infos);
        }
        catch (err) {
            console.error("Error when returning book info list:", err);
            res.status(500).json({ error: "Error when returning book info list!" });
        }
    });

    app.post("/api/bookInfo/getDetailed", bodyParser.json(), async (req, res) => {
        try {
            const {_id} = req.body;
            const book = await BookInfoCollection.findOne({"_id" : _id});
            if (book === undefined || book == null) {
                res.status(500).json({ error: "Book _id not found in database!" });
                return;
            }
            res.json(book);
        }
        catch (err) {
            console.error("Error when returning book info list:", err);
            res.status(500).json({ error: "Error when returning book info list!" });
        }
    });



}