'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        CPF: "238.620.456-17",
        type: 'client',
        name: "Maria F",
        RG: "CL-123980",
        birth: "05/13/2001",
        fone: "987654321",
        email: "f.Maria@mail.com",
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
