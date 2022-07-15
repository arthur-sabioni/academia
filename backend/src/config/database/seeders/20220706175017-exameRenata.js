'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Exams", [
      {
        CPF: "926.440.836-30",
        weight: 56.0,
        height: 1.60,
        pressure: "122/88",
        fat: 0.17,
        leanMass: 0.83,
        able: true,
        IMC: 21.88,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Exams", null, {});
  }
};