const db = require("../models");
module.exports = function(app){
    //load index page
    app.get("/", function(req, res){
        res.render("index");
    })
}