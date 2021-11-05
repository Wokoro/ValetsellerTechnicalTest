'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WarehouseProducts', {
      productId: {
        type: Sequelize.DECIMAL
      },
      warehouseId: {
        type: Sequelize.DECIMAL
      },
      quantityOnHand: {
        type: Sequelize.DECIMAL
      },
      warehouseSKU: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('WarehouseProducts');
  }
};
