// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
    
    //GET route for getting all the users
    app.get("/api/user", function(req, res) {
        var query = {};
        if (req.query.author_id) {
          query.AuthorId = req.query.author_id;
        }
        
        db.Post.findAll({
          where: query,
          include: [db.Author]
        }).then(function(dbPost) {
          res.json(dbPost);
        });
      });
  // GET route for getting a single user
  app.get("/api/user", function(req, res) {
    db.Post.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Author]
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });
    

  // POST route for saving a new user. 
  app.post("/api/user", function(req, res) {
    db.Post.create(req.body).then(function(dbUser) {
        res.json(dbUser);
      });
    });
  

  // DELETE route for deleting users.
  app.delete("/api/user/:id", function(req, res) {
    db.Post.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });
    //DELETE route for deleting users' friends. 
    app.delete("/api/user_friends:id", function(req, res) {
      db.Post.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbUser) {
          res.json(dbUser);
        });
      });

  // PUT route for updating users.
  app.put("/api/users", function(req, res) {
    db.Post.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }).then(function(dbUser) {
        res.json(dbUser);
      });
    });
  };