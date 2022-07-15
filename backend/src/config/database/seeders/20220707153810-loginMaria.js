'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logins", [
      {
        CPF: "238.620.456-17",
        password: "$2a$08$xYWFvnuKAZ3zcVTRanfNXeNrVV1dsAtsk4u9jf.F9vaaxC4eDedua",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logins", null, {});
  }
};
