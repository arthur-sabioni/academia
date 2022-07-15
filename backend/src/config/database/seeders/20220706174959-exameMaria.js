'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Exams", [
      {
        CPF: "238.620.456-17",
        weight: 78.0,
        height: 1.68,
        pressure: "124/82",
        fat: 0.17,
        leanMass: 0.83,
        able: true,
        IMC: 27.64,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Exams", null, {});
  }
};