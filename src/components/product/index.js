/**
 * @author - Wokoro Douye Samuel
 */

import controller from './controller';

import { dataBackupValidations } from './validation';

export default [
  {
    path: '/products/backup',
    method: 'post',
    handlers: [...dataBackupValidations, controller.backupData]
  }
];
