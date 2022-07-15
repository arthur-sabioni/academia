'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Exams", [
      {
        CPF: "631.597.796-02",
        weight: 112.0,
        height: 1.95,
        pressure: "132/90",
        fat: 0.15,
        leanMass: 0.85,
        able: true,
        IMC: 29.45,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Exams", null, {});
  }
};