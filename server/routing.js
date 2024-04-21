module.exports = function(app) {
    const database = require('./database.js');
    require('./auth.js')(app);
    require('./bookRequests.js')(app);

    app.get("/api",(req, res) =>{

        res.json({"test": ["api"]});

    })

}