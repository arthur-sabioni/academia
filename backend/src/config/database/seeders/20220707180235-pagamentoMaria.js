'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Payments", [
      {
        userId: 2,
        cardNumber: "1000-0110",
        flag: "Visa",
        ownerName: "Maria F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Payments", null, {});
  }
};
