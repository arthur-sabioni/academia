'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Schemes", [
      {
        paymentFrequency: "Anual",
        modality: "Natação",
        trainingFrequency: 2,
        price: 182.75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Schemes", null, {});
  }
};