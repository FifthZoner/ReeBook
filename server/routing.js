require('./database.js');

module.exports = function(app) {

    app.get("/api",(req, res) =>{

        res.json({"test": ["api"]});

    })

}