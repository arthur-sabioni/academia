'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Exams", [
      {
        CPF: "711.532.666-52",
        weight: 70.0,
        height: 1.69,
        pressure: "110/70",
        fat: 0.20,
        leanMass: 0.80,
        able: true,
        IMC: 24.51,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Exams", null, {});
  }
};