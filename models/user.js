var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
    firstName: {
            type: DataTypes.STRING,
            allowNull: false}
            ,
    lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            validate: {
                isEmail: true},
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
        },
    },

    profession_id : {
        type: DataTypes.INTEGER,
    allowNull: false},

    })

    User.belongsToMany(Game, {
        through: 'users_games'
      });
    User.hasMany(Game, {
        through: 'user_games'
    });

    User.hasMany (User, {
        through : "user_friends"
    })

    User.belongsToMany(User, {
        through: "user_friends"
    })

  User.hasOne(Profession,{as: "profession_id"} )

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User 
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};

