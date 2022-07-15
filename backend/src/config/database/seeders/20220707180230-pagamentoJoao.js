'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Payments", [
      {
        userId: 1,
        cardNumber: "3000-1000",
        flag: "Mastercard",
        ownerName: "Joao F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Payments", null, {});
  }
};
