'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Payments", [
      {
        userId: 3,
        cardNumber: "3010-1020",
        flag: "Mastercard",
        ownerName: "Pedro D",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Payments", null, {});
  }
};
