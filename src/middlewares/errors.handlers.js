/**
 * @author - wokorosamuel@yahoo.com
 */

import * as ErrorHelper from '../errors';

/**
 * @description - Not found Error handler function
 *
 * @param {object} router - Express router object
 *
 * @return {void} - No return value
 */
const noMethodErrorHandler = (router) => {
  ErrorHelper.notFoundError(router);
};

/**
 * @description - Client related error handler function
 *
 * @param {object} router - Express router object
 *
 * @return {void} - No value returned
 */
const clientErrorHandler = (router) => {
  ErrorHelper.clientError(router);
};

/**
 * @description - Server related error handler function
 *
 * @param {object} router - Express router object
 *
 * @return {void} - No value returned
 */
const serverErrorHandler = (router) => {
  ErrorHelper.serverError(router);
};

export default {
  notFound: noMethodErrorHandler,
  clientError: clientErrorHandler,
  serverError: serverErrorHandler
};
