/**
 * @author - Wokoro Douye Samuel
 */

import repository from './repository';
import warehouseRepo from '../warehouse/repository';
import db from '../../database/models';
import { productDataSerializer, sendSuccessMessage } from '../../utils';
import { getProducts } from '../../service';
import { Http400Error, Http404Error } from '../../errors/client.error.spec';

let transaction = null;
/**
 * @class
 *
 * @description - Class for Product controller.
 */
class ProductController {
  /**
   * @description - Function to backup project data
   *
   * @param {object} param0 - Request body property.
   *
   * @param {object} res - Express response object.
   *
   * @param {function} next - Function to pass control to next function.
   *
   * @return {void} - No return value
   */
  async backupData({ body }, res, next) {
    try {
      transaction = await db.sequelize.transaction();

      const { skus } = body;

      const { data = [], status = '' } = await getProducts(skus);

      if (status !== 'Success') {
        throw new Http400Error('Error retrieving product information')
      }

      if (data.length === 0) {
        throw new Http404Error('Product information not found')
      }

      const { products, warehouses, warehouseProducts } = productDataSerializer(data);

      await repository.bulkCreate(products, { transaction });
      await warehouseRepo.bulkCreate(warehouses, { transaction });
      await warehouseRepo.createWarehouseProducts(warehouseProducts, { transaction });

      await transaction.commit();

      sendSuccessMessage(res, 200, 'Products(s) backed up successfully')

    } catch (error) {
      if (transaction) await transaction.rollback();
      next(error);
    }
  }
}

export default new ProductController();
