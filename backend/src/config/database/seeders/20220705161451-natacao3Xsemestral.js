'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Schemes", [
      {
        paymentFrequency: "Semestral",
        modality: "Natação",
        trainingFrequency: 3,
        price: 206.10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Schemes", null, {});
  }
};