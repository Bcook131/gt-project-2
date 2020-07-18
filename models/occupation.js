module.exports = function(sequelize, DataTypes) {
    let Occupation = sequelize.define("Occupation", {
      Occupation_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      occupation: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
      }
    })
    Occupation.associate = (models) => {
      Occupation.belongsTo(models.User, {foreignKey: 'Occupation_id'});
    }

    return Occupation;
};