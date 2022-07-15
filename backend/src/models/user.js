'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    CPF: DataTypes.STRING,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    RG: DataTypes.STRING,
    birth: DataTypes.DATE,
    fone: DataTypes.STRING,
    email: DataTypes.STRING,
    imageName: DataTypes.STRING,
    imageType: DataTypes.STRING,
    imageData: DataTypes.BLOB('long')
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = function(models) {
    User.belongsTo(models.Exam, {
      foreignKey: 'CPF',
      onDelete: 'CASCADE'
    })
  } 

  User.associate = function(models) {
    User.hasMany(models.Payment, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  }

  User.associate = function(models) {
    User.hasMany(models.Login, {
      foreignKey: 'CPF',
      onDelete: 'CASCADE'
    })
  }

  User.associate = function(models) {
    User.hasMany(models.Registration, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  }

  return User;
};