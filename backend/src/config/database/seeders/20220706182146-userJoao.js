'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        CPF: "092.407.046-39",
        type: 'client',
        name: "Joao F",
        RG: "CL-123890",
        birth:  "2/20/2002",
        fone: "123456789",
        email: "f.joao@mail.com",
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
