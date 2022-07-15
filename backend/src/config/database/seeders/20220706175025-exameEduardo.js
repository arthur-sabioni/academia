'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Exams", [
      {
        CPF: "558.466.816-89",
        weight: 78.0,
        height: 1.72,
        pressure: "132/88",
        fat: 0.18,
        leanMass: 0.82,
        able: true,
        IMC: 26.37,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Exams", null, {});
  }
};