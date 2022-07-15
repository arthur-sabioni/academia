'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Registrations", [
      {
        userId: 3,
        schemeId: 2,
        timeId: [56,58,60],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        schemeId: 10,
        timeId: [67,69,70],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        schemeId: 9,
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
