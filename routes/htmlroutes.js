const db = require("../models");
module.exports = function(app){
    //load index page
    app.get("/", function(req, res){
        db.Occupation.findAll({raw:true}).then(occupations => {
            res.render("index", {occupations:occupations});
        })
        
    })
    app.get('/find', async function(req, res){
        var occupations = await db.Occupation.findAll({raw:true});
        var games = await db.Game.findAll({raw:true});
        res.render('find', {user: req.user, occupations, games})
    })
    app.get('/signup', async function(req, res){
        var occupations = await db.Occupation.findAll({raw:true});
        var games = await db.Game.findAll({raw:true});
        res.render('signup', {user: req.user, occupations, games})
    })
}
