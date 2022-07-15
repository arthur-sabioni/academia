'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Exams", [
      {
        CPF: "543.511.816-64",
        weight: 120.0,
        height: 1.86,
        pressure: "115/78",
        fat: 0.13,
        leanMass: 0.87,
        able: true,
        IMC: 34.69,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Exams", null, {});
  }
};