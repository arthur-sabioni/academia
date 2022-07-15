'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Classes", [
      {
        modality: "Natação",
        time: "10:00:00 GMT",
        weekDay: "Quinta",
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