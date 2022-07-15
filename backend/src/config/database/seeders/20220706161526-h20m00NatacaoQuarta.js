'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Classes", [
      {
        modality: "Natação",
        time: "20:00:00 GMT",
        weekDay: "Quarta",
        full: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Classes", null, {});
  }
};