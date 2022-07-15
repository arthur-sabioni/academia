'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Exams", [
      {
        CPF: "092.407.046-39",
        weight: 75.0,
        height: 1.72,
        pressure: "122/90",
        fat: 0.20,
        leanMass: 0.80,
        able: true,
        IMC: 25.35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Exams", null, {});
  }
};