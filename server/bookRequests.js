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
            console.log(user);
            if (user == undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(500).json({error: "Could not get user info! Is session valid?"});
                return;
            }
            if (user.other.accessLevel < 1) {
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



}