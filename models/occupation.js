module.exports = function(sequelize, DataTypes) {
    var Occupation = sequelize.define("Profession", {
        name: DataTypes.STRING,
    })
   
    Occupation.belongsTo(User)
      
      return User;
};

