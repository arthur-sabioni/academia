'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    userId: DataTypes.INTEGER,
    cardNumber: DataTypes.STRING,
    flag: DataTypes.STRING,
    ownerName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });

  Payment.associate = function(models) {
    Payment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  } 

  return Payment;
};