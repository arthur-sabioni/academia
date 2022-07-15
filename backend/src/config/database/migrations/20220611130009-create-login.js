'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      CPF: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique:true,
        validate: {
          is: /(\d{3}\.?\d{3}\.?\d{3}\-?\d{2})/g,
        },
        references: {
          model: 'Users',
          key: 'CPF',
          as: 'userId',
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Logins');
  }
};