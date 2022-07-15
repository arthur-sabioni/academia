'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Schemes", [
      {
        paymentFrequency: "Anual",
        modality: "Spinning, Crossfit, Ritmos",
        trainingFrequency: 3,
        price: 130.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Schemes", null, {});
  }
};