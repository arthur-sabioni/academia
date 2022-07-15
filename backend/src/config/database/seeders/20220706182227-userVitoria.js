'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        CPF: "711.532.666-52",
        type: 'doctor',
        name: "Vitoria F",
        RG: "ME-456123",
        birth: "11/06/1997",
        fone: "854612365",
        email: "f.vitoria@mail.com",
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
