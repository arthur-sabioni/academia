'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logins", [
      {
        CPF: "711.532.666-52",
        password: "$2a$08$t9wyH3piabuJ.2aRnRTqHO4eXu48qje26F.TyI0IpuriSpHRTc1jS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logins", null, {});
  }
};
