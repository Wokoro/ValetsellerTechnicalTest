'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WarehouseProducts', [
      {
        productId: 54321354,
        warehouseId: 2019006400,
        quantityOnHand: 23,
        warehouseSKU: 'johnhenry-apple-1pack',
        isActive: true
      },
      {
        productId: 54321354,
        warehouseId: 1012006200,
        quantityOnHand: 10,
        warehouseSKU: 'johnhenry-apple-1pack',
        isActive: true
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WarehouseProducts', null, {});
  }
};
