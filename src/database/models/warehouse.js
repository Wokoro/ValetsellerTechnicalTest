'use strict';

module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    static associate(models) {
      Warehouse.belongsToMany(models.Products, {
        through: 'WarehouseProducts',
        foreignKey: 'warehouseId',
        otherKey: 'productId',
        as: 'products'
      });
    }
  };

  Warehouse.init({
    id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    }
    includeInSyncBalance: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Warehouse'
  });

  return Warehouse;
};
