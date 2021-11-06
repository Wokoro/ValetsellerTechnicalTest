/**
 * @author Wokoro Douye Samuel
 */

import {
  UniqueConstraintError,
  TimeoutError,
  ConnectionError,
  DatabaseError,
} from 'sequelize';
import { HttpClientError, Http400Error, Http406Error } from '../errors/client.error.spec';
import { sendErrorMessage, sendValidationErrorMessage } from './index';

/**
 * @description Route not found error helper method.
 *
 * @param {object} router - Express router to be passed.
 *
 * @return {void} Returns nothing.
 */
export const notFoundError = (router) => {
  router.use((req, res) => {
    throw new Http400Error();
  });
};

/**
 * @description Client error helper method.
 *
 * @param {object} router - Express router to be passed.
 *
 * @return {void} Returns nothing.
 */
export const clientError = (router) => {
  router.use((err, req, res, next) => {
    if (err instanceof Http406Error) {
      return sendValidationErrorMessage(res, err.status, err.message)
    }
    if (err instanceof HttpClientError) {
      return sendErrorMessage(res, err.status, err.message);
    }
    if (err instanceof SyntaxError) {
      return sendErrorMessage(res, 406, 'Input syntax error')
    }

    next(err);
  });
};

/**
 * @description Server error helper method.
 *
 * @param {object} router - Express router to be passed.
 *
 * @return {void} Returns nothing.
 */
export const serverError = (router) => {
  router.use((err, req, res, next) => {
    if (err instanceof ConnectionError) {
      console.log('error: ', err)
      return sendErrorMessage(res, 500, 'Server error occured');
    }
    if (err instanceof DatabaseError) {
      console.log('error: ', err)
      return sendErrorMessage(res, 500, 'Server error occured');
    }
    if (err instanceof TimeoutError) {
      console.log('error: ', err)
      return sendErrorMessage(res, 500, 'Server error occured');
    }
    if (err instanceof Error) {
      console.log(err);
      return sendErrorMessage(res, 500, 'Server error occured');
    }
    console.log(err);
    return sendErrorMessage(res, 500, 'Server error occured');
  });
};
