'use strict';
module.exports = (sequelize, DataTypes) => {
  const WarehouseProducts = sequelize.define('WarehouseProducts', {
    productId: {
      type: DataTypes.DECIMAL,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    warehouseId: {
      type: DataTypes.DECIMAL,
      references: {
        model: 'Warehouses',
        key: 'id'
      }
    },
    quantityOnHand: DataTypes.DECIMAL,
    warehouseSKU: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {});
  WarehouseProducts.associate = function (models) {
    // associations can be defined here
  };
  return WarehouseProducts;
};
