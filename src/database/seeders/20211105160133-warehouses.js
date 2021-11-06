'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Warehouses', [
      {
        id: 2019006400,
        includeInSyncBalance: true,
      },
      {
        id: 1012006200,
        includeInSyncBalance: true,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Warehouses', null, {});
  }
};
