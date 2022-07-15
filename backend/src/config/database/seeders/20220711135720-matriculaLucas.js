'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Registrations", [
      {
        userId: 4,
        schemeId: 11,
        timeId: [86,87,88],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        schemeId: 2,
        timeId: [84,85],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        schemeId: 8,
        timeId: [91],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Registrations", null, {});
  }
};
