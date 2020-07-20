const db = require("../models");
module.exports = function(app){
    //load index page
    app.get("/", function(req, res){
        db.Game.findAll({raw:true}).then(games => {
            db.Occupation.findAll({raw:true}).then(occupations => {
                res.render("index", {games:games,occupations:occupations});
            })
            
        })
        
    })
}