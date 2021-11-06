/**
 * @author - wokorosamuel@yahoo.com
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import routes from './components';
import middlewares from './middlewares';
import errorHandlers from './middlewares/errors.handlers';
import { middlewareLoader, routesLoader } from './utils';
import docs from './docs';

const router = express.Router();

const app = express();

app.use('/api/v1', router);

process.on('uncaughtException', (error) => {
  console.log('Uncaught: ', error);
});

process.on('unhandledRejection', (error) => {
  if (error.response) console.log('Unhandled: ', error.response.body.errors);
  console.log('Unhandled: ', error);
});

middlewareLoader(middlewares, router);
routesLoader(routes, router);
routesLoader(docs, router);
middlewareLoader(errorHandlers, router);

export default app;
