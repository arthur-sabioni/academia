'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
        },
        references: {
          model: 'Exams',
          key: 'CPF',
          as: 'CPF',
        }
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['secretary', 'doctor', 'teacher', 'client']],
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      RG: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      birth: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        }
      },
      fone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g,
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        }
      },
      imageName: {
        type: Sequelize.STRING
      },
      imageType: {
        type: Sequelize.STRING
      },
      imageData: {
        type: Sequelize.BLOB(Sequelize.LONG)
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
    await queryInterface.dropTable('Users');
  }
};