/**
 * @author - Wokoro Douye Samuel
 */

import * as ErrorHelper from '../utils/error.helpers';

/**
 * @description - No 404 Error handler function
 *
 * @param {object} router - Express router object
 *
 * @return {void} - No return value
 */
const noMethodErrorHandler = (router) => {
  ErrorHelper.notFoundError(router);
};

/**
 * @description - Client side error handler function
 *
 * @param {object} router - Express router object
 *
 * @return {void} - No value returned
 */
const clientErrorHandler = (router) => {
  ErrorHelper.clientError(router);
};

/**
 * @description - Server side error handler function
 *
 * @param {object} router - Express router object
 *
 * @return {void} - No value returned
 */
const serverErrorHandler = (router) => {
  ErrorHelper.serverError(router);
};

export default [noMethodErrorHandler, clientErrorHandler, serverErrorHandler];
