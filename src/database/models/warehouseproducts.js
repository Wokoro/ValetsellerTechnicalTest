'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class WarehouseProducts extends Model {
    static associate(models) { }
  };

  WarehouseProducts.init({
    productId: {
      primaryKey: true,
      type: DataTypes.DECIMAL,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    warehouseId: {
      primaryKey: true,
      type: DataTypes.DECIMAL,
      references: {
        model: 'Warehouses',
        key: 'id'
      }
    },
    quantityOnHand: DataTypes.DECIMAL,
    warehouseSKU: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: false,
    modelName: 'WarehouseProducts'
  });

  return WarehouseProducts;
};
