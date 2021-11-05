'use strict';

import { Model } from 'sequelize';
import { hashPassword } from '../../utils/auth';

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Warehouse, {
        through: 'WarehouseProducts',
        foreignKey: 'productId',
        otherKey: 'warehouseId',
        as: 'warehouses'
      });
    }
  };

  Product.init({
    id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    sku: DataTypes.STRING,
    quantityOnHand: DataTypes.DECIMAL,
    upc: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Product'
  });

  return Product;
};
