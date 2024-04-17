const session = require("express-session");
const {UserEntry} = require("./database");
const bodyParser = require("body-parser");
module.exports = function(app) {

    app.use(session({
        secret: 'whatdoIwriteherepleasetellmetutorials',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    app.post("/api/login", bodyParser.json(), async(req, res) => {
        try {
            const { email, passwordHash } = req.body;
            console.log("Login request:\n", email, passwordHash);
            const user = await UserEntry.findOne({"credentials.email" : email, "credentials.passwordHash" : passwordHash});
            console.log(user);
            if (user == null) {
                console.error("Could not find a match for credentials:", err);
                res.status(500).json({ error: "Incorrect email and password combination!" });
            }
            else {
                req.session.userId = user._id;
                res.redirect('/');
            }
        }
        catch (err) {
            console.error("Error when logging in:", err);
            res.status(500).json({ error: "Error when logging in!" });
        }
    });

    app.get("/api/logout", bodyParser.json(), async(req, res) => {
        try {
            req.session = null;
            res.redirect('/');
        }
        catch (err) {
            console.error("Error when logging out:", err);
            res.status(500).json({ error: "Error when logging out!" });
        }
    });

}