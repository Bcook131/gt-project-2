const db = require("../models");
module.exports = function(app){
    //load index page
    app.get("/", function(req, res){
        db.Game.findAll().then(games => {
            console.log(games)
            res.render("index", {games:games});
        })
        
    })
}