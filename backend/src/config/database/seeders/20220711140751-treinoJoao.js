'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Trainings", [
      {
        registrationId: 3,
        exerciseId: 1,
        repetitions: 30,
        card: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        registrationId: 3,
        exerciseId: 2,
        repetitions: 30,
        card: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        registrationId: 3,
        exerciseId: 3,
        repetitions: 30,
        card: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        registrationId: 3,
        exerciseId: 4,
        repetitions: 30,
        card: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        registrationId: 3,
        exerciseId: 13,
        repetitions: 30,
        card: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        registrationId: 3,
        exerciseId: 14,
        repetitions: 30,
        card: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Trainings", null, {});
  }
};
