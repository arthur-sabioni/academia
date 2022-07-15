'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Payments", [
      {
        userId: 4,
        cardNumber: "3010-0310",
        flag: "Mastercard",
        ownerName: "Lucas J",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Payments", null, {});
  }
};
