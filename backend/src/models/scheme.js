'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scheme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Scheme.init({
    paymentFrequency: DataTypes.STRING,
    modality: DataTypes.STRING,
    trainingFrequency: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Scheme',
  });

  Scheme.associate = function(models) {
    Scheme.hasMany(models.Registration, {
      foreignKey: 'schemeId',
      onDelete: 'CASCADE'
    })
  }

  return Scheme;
};