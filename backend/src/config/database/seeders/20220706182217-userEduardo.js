'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        CPF: "558.466.816-89",
        type: 'teacher',
        name: "Eduardo B",
        RG: "PR-546123",
        birth: "04/08/2000",
        fone: "998754213",
        email: "b.dudu@mail.com",
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
