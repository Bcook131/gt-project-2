const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 8080;


const db = require("./models");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main", allowProtoPropertiesByDefault:true }));
app.set("view engine", "handlebars");


require("./routes/api-routes.js")(app);
require("./routes/htmlroutes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
<<<<<<< HEAD
    console.log(`App listening (PORT ${PORT}) @ http://localhost:${PORT}`);
=======
    console.log(`http://localhost:${PORT}`);
>>>>>>> 2b8c42dabd0531a33255a51088eba75586780e83
  });
});
