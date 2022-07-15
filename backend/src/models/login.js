'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Login.init({
    CPF: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Login',
  });

  Login.associate = function(models) {
    Login.belongsTo(models.User, {
      foreignKey: 'CPF',
      onDelete: 'CASCADE'
    })
  } 

  Login.beforeSave(async (user, options) => {
    const password = await encryptor.hashPassword(user.CPF);
    if (user.changed("password")) {
      Object.assign(user, { password });
    }
    return user;
  });

  return Login;
};