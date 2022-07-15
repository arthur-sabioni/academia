'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Schemes", [
      {
        paymentFrequency: "Mensal",
        modality: "Spinning, Crossfit, Ritmos",
        trainingFrequency: 3,
        price: 155.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Schemes", null, {});
  }
};