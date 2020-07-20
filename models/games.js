module.exports = function(sequelize, DataTypes) {
    let Game = sequelize.define("Game", {
      game_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
      },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      allowNull: true
    }
    })
    Game.associate = (models) => {
      Game.belongsToMany(models.User, { as: 'UserGames', through: models.User_games, foreignKey: 'game_id'});
    }

    return Game;
};

