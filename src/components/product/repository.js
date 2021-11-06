/**
 * @author - Wokoro Douye Samuel
 */

import models from '../../database/models';

const { Product: model } = models;

export default {
  /**
   * @description - Function to bulk create new products.
   *
   * @param {object} attributes - Product attributes values.
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
  }
};
