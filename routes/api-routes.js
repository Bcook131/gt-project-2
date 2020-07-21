
var db = require("../models");
var passport = require("../config/passport");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {  
  app.get("/api/games", function(req,res){
    db.Game.findAll().then((games)=>{
      const gamesToReturn = games.map((game) => {
        return {
        id: game.game_id,
        name: game.name,
      }; });
        res.json({
          error: false,
          data: games,
    });
    
  })})
//build more routes to get data in order to pass into the front end
//get all data into array in order to be used for dropdowns on the frontend
app.get("/api/occupations", function(req,res){
  db.Occupation.findAll().then((occupations)=>{
    const gamesToReturn = occupations.map((occupation) => {
      return {
      id: occupation.id,
      occupation: occupation.occupation,
    }; });
      res.json({
        error: false,
        data: occupations,
  });
  
})})

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
    console.log(info);
    db.User.create({
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      password: info.password,
      //expect occupation?
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

  app.get("/user/:id", function(req, res){
    const id = req.params.id;
   db.User.findOne({ where: { user_id: id } }).then((singleUser) => {
  const userToReturn = {
    id: singleUser.id,
    username: singleUser.email,
  };
  res.json({
    error: false,
    data: userToReturn,
    message: "User with requested id",
  });
})});



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
