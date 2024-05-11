const session = require("express-session");
const {UserCollection} = require("./database");
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
            const { email, password } = req.body;
            console.log("Login request:\n", email, password);
            // TODO: Change to hashed
            const user = await UserCollection.findOne({"credentials.email" : email, "credentials.passwordHash" : password});
            console.log(user);
            if (user == null) {
                console.error("Could not find a match for credentials:", err);
                res.status(500).json({ error: "Incorrect email and password combination!" });
            }
            else {
                req.session.userId = user._id;
                res.status(256).json( {"response": "Logged in successfully!"} );
            }
        }
        catch (err) {
            console.error("Error when logging in:", err);
            res.status(500).json({ error: "Error when logging in!" });
        }
    });

    app.get("/api/logout", bodyParser.json(), async(req, res) => {
        try {
            req.session.userId = null;
            req.session.destroy();
            req.session = null;
            res.status(256).json( {"response": "Logged out successfully!"} );
        }
        catch (err) {
            console.error("Error when logging out:", err);
            res.status(500).json({ error: "Error when logging out!" });
        }
    });

    app.put("/api/register", bodyParser.json(), async (req, res) => {
        try {
            const { email, password, nickname } = req.body;
            console.log("Register request:\n", email, password, nickname);
            // TODO: Change to hashed
            const user = new UserCollection({ "credentials.email": email,"credentials.passwordHash":password, "credentials.nickname":nickname })
            console.log(user);
            await user.save();

            req.session.userId = user._id;
            res.status(256).json( {"response": "Registered successfully!"} );
        }
        catch (err) {
            console.error("Error when registering:", err);
            res.status(500).json({ error: "Error when registering!" });
        }
    });

    app.get("/api/checkSession", bodyParser.json(), async(req, res) => {
        try {
            const user = await UserCollection.findOne({_id : req.session.userId});
            if (user === undefined || user == null) {
                res.status(401).json({ response: "User session is not valid!" });
                return;
            }
            res.status(200).json( { response: "Session is valid!"} );
        }
        catch (err) {
            console.error("Error when checking session:", err);
            res.status(500).json({ error: "Error when checking session!" });
        }
    })


}