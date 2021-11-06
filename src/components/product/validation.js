/**
 * @author - Wokoro Douye Samuel
 */

import { check } from 'express-validator';
import { generateErrorReport } from '../../utils';

export const dataBackupValidations = [
  check('skus')
    .isArray({ min: 1 })
    .withMessage('skus must be an array with at lease 1 sku value'),

  check('skus.*')

    .isString()
    .withMessage('skus value must be a string'),

  generateErrorReport
];
