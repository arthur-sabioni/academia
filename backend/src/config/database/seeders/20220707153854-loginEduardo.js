'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logins", [
      {
        CPF: "558.466.816-89",
        password: "$2a$08$JOEZtfkSSYNPf6oEn5YycOHoyb8HOApU8G4WQb9mCwdCXDQQdZ3rK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logins", null, {});
  }
};
