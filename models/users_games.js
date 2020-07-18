module.exports = function(sequelize, DataTypes) {
    let Game = sequelize.define("Game", {
        name: DataTypes.STRING,
    })
    // Game.associate = function(models){
    //     Game.belongsToMany(models.User,
    //       {foreignKey: {
    //       allowNull: false
    //    }},
    //    {through: "users_games"}
    //    );
    
    //     Game.hasMany(models.User, 
    //       {foreignKey: {
    //                  allowNull: false
    //               }},
    //       {through: "users_games"}

    //               )}

    return Game;
};

