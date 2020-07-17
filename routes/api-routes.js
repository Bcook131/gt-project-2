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
    app.get("/api/posts", function(req, res) {
        var query = {};
        if (req.query.author_id) {
          query.AuthorId = req.query.author_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Post.findAll({
          where: query,
          include: [db.Author]
        }).then(function(dbPost) {
          res.json(dbPost);
        });
      });
  // GET route for getting a single user
  app.get("/api/users", function(req, res) {
    db.Post.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Author]
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });
    

  // POST route for saving a new user. You can create a user using the data on req.body
  app.post("/api/users", function(req, res) {
    db.Post.create(req.body).then(function(dbUser) {
        res.json(dbUser);
      });
    });
  

  // DELETE route for deleting users. You can access the user's id in req.params.id
  app.delete("/api/users/:id", function(req, res) {
    db.Post.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });

  // PUT route for updating users. The updated user will be available in req.body
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