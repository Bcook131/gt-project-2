module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
        name: DataTypes.STRING,
    })
    Game.belongsToMany(User, {
        through: 'users_games'
      });

    Game.hasMany(user,
        {through: "users_games"
    })
    return User;
};