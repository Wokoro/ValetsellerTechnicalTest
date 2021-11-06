/**
 * @author - wokorosamuel@yahoo.com
 */

import {
  UniqueConstraintError,
  TimeoutError,
  ConnectionError,
  DatabaseError,
} from 'sequelize';
import { HttpClientError, Http400Error, Http406Error } from './client.error.spec';
import { sendErrorMessage, sendValidationErrorMessage } from '../utils';

import winston from '../config/winston';

/**
 * @description Route not found error helper method.
 *
 * @param {object} router - Express router to be passed.
 *
 * @return {void} Returns nothing.
 */
export const notFoundError = (router) => {
  router.use((err, req, res, next) => {
    throw new Http400Error('Not found');
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
    winston.logger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    if (err instanceof Http406Error) {
      console.log('error: ')
      return sendValidationErrorMessage(res, err.status, err.message);
    }
    if (err instanceof HttpClientError) {
      return sendErrorMessage(res, err.status, err.message);
    }
    if (err instanceof UniqueConstraintError) {
      return sendErrorMessage(res, 409, err.message);
    }
    if (err instanceof SyntaxError) {
      return sendErrorMessage(res, 406, 'Input syntax error');
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
    winston.logger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    if (err instanceof ConnectionError) {
      console.log('error: ', err);
      return sendErrorMessage(res, 500, 'Server error occured');
    }
    if (err instanceof DatabaseError) {
      console.log('error: ', err);
      return sendErrorMessage(res, 500, 'Server error occured');
    }
    if (err instanceof TimeoutError) {
      console.log('error: ', err);
      return sendErrorMessage(res, 500, 'Server error occured');
    }
    if (err instanceof Error) {
      console.log(err.message);
      return sendErrorMessage(res, 500, 'Server error occured');
    }
    if (err.errno === 'ENOTFOUND') {
      console.log('error: ', err);
      return sendErrorMessage(res, 503, 'External service down, please try again later');
    }
    console.log('Special: ', err);
    return sendErrorMessage(res, 500, 'Server error occured');
  });
};
