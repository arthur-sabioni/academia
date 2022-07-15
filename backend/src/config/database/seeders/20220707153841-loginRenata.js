'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logins", [
      {
        CPF: "926.440.836-30",
        password: "$2a$08$AVzuKtNOxF1/QaUBlpCoH.qqF/pA9F9kRtXfzOHTiGAI1KO5bnZyC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logins", null, {});
  }
};
