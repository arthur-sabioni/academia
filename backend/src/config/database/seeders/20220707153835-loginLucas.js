'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logins", [
      {
        CPF: "631.597.796-02",
        password: "$2a$08$eCn9P8Dr4EwEByfAGvDa6e4Ra79yPXSHMiPzBORHBh9SB2nt/0R6S",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logins", null, {});
  }
};
