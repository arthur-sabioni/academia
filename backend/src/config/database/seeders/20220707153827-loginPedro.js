'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logins", [
      {
        CPF: "543.511.816-64",
        password: "$2a$08$KnMQXkcY4.x3.bgKe34/Nev0Klhd0X7qpMt5ZkMFw5iN0I9Q924Ai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logins", null, {});
  }
};
