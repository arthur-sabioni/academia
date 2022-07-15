'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Schemes", [
      {
        paymentFrequency: "Mensal",
        modality: "Musculação",
        trainingFrequency: 7,
        price: 125.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Schemes", null, {});
  }
};