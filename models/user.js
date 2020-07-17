module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        profession_id : DataTypes.INTEGER
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
    return User;

};