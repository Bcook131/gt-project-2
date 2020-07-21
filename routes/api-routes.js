
var db = require("../models");
var passport = require("../config/passport");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log(req.body)

    passport.use(
      'login',
      
      new LocalStrategy(
        {
          usernameField: req.body.email,
          passwordField: req.body.password,
        },
        async (email, password, done) => {
          try {
           
            const user = await UserModel.findOne({
              where: {
                
                email: email,
              },
            });
            if (!user) {
              
              return done(null, false, { message: 'User not found' });
            }
    
            
            const validate = await user.validatePassword(password);
            if (!validate) {
              return done(null, false, { message: 'Wrong Password' });
            }
            
            return done(null, user, { message: 'Logged in Successfully' });
          } catch (error) {
            return done(error);
          }
        }
      )
    );
    
   return res.status(200).json(req.user);
  });

  app.post("/api/signup", function(req, res) { 
    let info = req.body;
    console.log(info)
    db.User.create({
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      password: info.password,
      OccupationId: info.OccupationId,
    }).then(function(request, response) {

        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
      
  });

 
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
     
      res.json({});
    } else {
     
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
