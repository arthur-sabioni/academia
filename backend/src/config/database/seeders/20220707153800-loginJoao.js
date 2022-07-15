'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Logins", [
      {
        CPF: "092.407.046-39",
        password: "$2a$08$saDSQxuOl1tpphSSeGYwKOYIy1ux5X2icD2gYx7.L3h9a9rDO77vG",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Logins", null, {});
  }
};
