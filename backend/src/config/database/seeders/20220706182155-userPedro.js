'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        CPF: "543.511.816-64",
        type: 'client',
        name: "Pedro D",
        RG: "CL - 123098",
        birth: "06/05/1998",
        fone: "123459876",
        email: "d.pedro@mail.com",
        imageName: null,
        imageType: null,
        imageData: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
