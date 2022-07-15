'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Classes", [
      {
        modality: "Crossfit",
        time: "06:30:00 GMT",
        weekDay: "Segunda",
        full: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Classes", null, {});
  }
};