'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trainings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      registrationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      exerciseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      repetitions: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      card: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['A','B','C']]
        }
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
    await queryInterface.dropTable('Trainings');
  }
};