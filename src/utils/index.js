/**
 * @author - wokorosamuel@yahoo.com
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import { validationResult } from 'express-validator';
import middlewares from '../middlewares';
import errorHandlerMiddlewares from '../middlewares/errors.handlers';

import { Http406Error } from '../errors/client.error.spec';

dotenv.config();

/**
 * @description - A function to load all high level middleware
 *
 * @param {object} names - Array of middleware names to include to be added to the route.
 *
 * @param {object} router - Express router object.
 *
 * @returns {void} - No return value.
 */
export const middlewareLoader = (middlewares, router) => {
  for (const middleware of middlewares) {
    middleware(router);
  }
};

/**
 * @description - A function to load all error handling middlewares
 *
 * @param {object} names - Array of middlewares names to include.
 *
 * @param {object} router - Express router object.
 *
 * @returns {void} - No return value.
 */
export const errorMiddlewareLoader = (names, router) => {
  for (const name of names) {
    errorHandlerMiddlewares[name](router);
  }
};

/**
 * @description - A function to load all routes
 *
 * @param {object} routes - Array of routes to be included.
 *
 * @param {object} router - Express router object.
 *
 * @returns {void} - No return value.
 */
export const routesLoader = (routes, router) => {
  for (const route of routes) {
    const { path, handlers, method } = route;
    (router)[method](path, handlers);
  }
};

/**
 * @description - A function to send client success message
 *
 * @param {obejct} res - HTTP response object
 *
 * @param {integer} code - HTTP status code to send
 *
 * @param {string} data - Data to send to the client
 *
 * @returns {object} Returns status code and data to client
 */
export const sendSuccessMessage = (res, code, data) => res.status(code).send({
  status: 'success',
  data
});

/**
 * @description - A function to send client error message.
 *
 * @param {object} res - HTTP response object
 *
 * @param {integer} code - HTTP status code to send
 *
 * @param {string} error - Data to send to the client
 *
 * @returns {object} Returns status code and data to client
 */
export const sendErrorMessage = (res, code, error) => res.status(code).send({
  status: 'error',
  error
});

/**
 * @description - A function to send client validation error message.
 *
 * @param {object} res - HTTP response object
 *
 * @param {integer} code - HTTP status code to send
 *
 * @param {string} validationError - Data to send to the client
 *
 * @returns {object} Returns status code and data to client
 */
export const sendValidationErrorMessage = (res, code, validationError) => res.status(code).send({
  status: 'error',
  validationError
});

/**
 * @description - Function to return all validation errors
 *
 * @param {object} req - HTTP request object
 *
 * @param {object} res - HTTP response object
 *
 * @param {function} next - Function to trigger next function exec.
 *
 * @returns {object} - Returns constructed error message
 */
export const generateErrorReport = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const validationError = result.array().map(e => e.msg);
    throw new Http406Error(validationError);
  }
  return next();
};


/**
 * @description - Function to serialize ecomdash products information
 *
 * @param {object[]} data - Products information returned from ecomdash
 *
 * @returns {object} - Returns serialize product information
 */
export const productDataSerializer = (data) => {
  const result = data.reduce((acc, { Id, Sku, QuantityOnHand, Warehouses }) => {
    acc.products = acc.products ?? {};
    acc.warehouses = acc.warehouses ?? {};
    acc.warehouseProducts = acc.warehouseProducts ?? {};

    if (!acc.products?.[Id]) {
      acc.products[Id] = { id: Id, sku: Sku, quantityOnHand: QuantityOnHand }
    }

    Warehouses.forEach(({ WarehouseId, QuantityOnHand, WarehouseSKU, IsActive, IncludeInSyncBalance }) => {
      if (!acc.warehouses?.[WarehouseId]) {
        acc.warehouses[WarehouseId] = {
          id: WarehouseId,
          includeInSyncBalance: IncludeInSyncBalance
        }
      }

      acc.warehouseProducts[`${Id}_${WarehouseId}`] = {
        productId: Id,
        warehouseId: WarehouseId,
        quantityOnHand: QuantityOnHand,
        warehouseSKU: WarehouseSKU,
        isActive: IsActive
      }
    });

    return acc;
  }, {});

  const { products, warehouses, warehouseProducts } = result;

  return {
    products: Object.values(products),
    warehouses: Object.values(warehouses),
    warehouseProducts: Object.values(warehouseProducts)
  }
}
