module.exports = function(app) {
    const database = require('./database.js');
    require('./auth.js')(app);
    require('./bookRequest.js')(app);
    require('./bookInfo.js')(app);
    require('./bookInstance.js')(app);

    app.get("/api",(req, res) =>{

        res.json({"test": ["api"]});

    })

}