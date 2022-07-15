'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Registration.init({
    userId: DataTypes.INTEGER,
    schemeId: DataTypes.INTEGER,
    timeId: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Registration',
  });

  Registration.associate = function(models) {
    Registration.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  } 

  Registration.associate = function(models) {
    Registration.belongsTo(models.Scheme, {
      foreignKey: 'schemeId',
      onDelete: 'CASCADE'
    })
  } 
  
  return Registration;
};