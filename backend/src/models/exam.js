'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exam.init({
    CPF: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    pressure: DataTypes.STRING,
    fat: DataTypes.FLOAT,
    leanMass: DataTypes.FLOAT,
    able: DataTypes.BOOLEAN,
    IMC: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Exam',
  });

  Exam.associate = function(models) {
    Exam.hasMany(models.User, {
      foreignKey: 'CPF',
      onDelete: 'CASCADE'
    })
  } 

  return Exam;
};