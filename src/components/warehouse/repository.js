/**
 * @author - Wokoro Douye Samuel
 */

import models from '../../database/models';

const { Warehouse: model, WarehouseProducts, Sequelize: { Op } } = models;

export default {

  /**
   * @description - Function to bulk create new warehouses.
   *
   * @param {object[]} payload - Warehouses to be created.
   *
   * @returns {promise} Returns a promise.
   */
  async bulkCreate(payload = [], options = {}) {
    return model.bulkCreate(
      payload,
      {
        ignoreDuplicates: true,
        ...options
      }
    );
  },

  /**
   * @description - Function to bulk create warehouse products.
   *
   * @param {object[]} payload - Warehouses to be created.
   *
   * @returns {promise} Returns a promise.
   */
  async createWarehouseProducts(payload = [], options = {}) {
    return WarehouseProducts.bulkCreate(payload, {
      updateOnDuplicate: ['quantityOnHand', 'warehouseSKU', 'isActive']
    });
  }
};
