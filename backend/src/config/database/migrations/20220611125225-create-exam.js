'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CPF: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate: {
          is: /(\d{3}\.?\d{3}\.?\d{3}\-?\d{2})/g,
        }
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      pressure: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      leanMass: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      able: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      IMC: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('Exams');
  }
};