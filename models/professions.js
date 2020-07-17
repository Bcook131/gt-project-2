module.exports = function(sequelize, DataTypes) {
    var Profession = sequelize.define("Profession", {
        name: DataTypes.STRING,
    })
   
    Profession.belongsTo(User)
      
      return User;
};

