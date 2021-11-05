/**
 * @author - wokorosamuel@yahoo.com
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import routes from './components';
import { middlewareLoader, errorMiddlewareLoader, routesLoader } from './utils';
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

middlewareLoader(['cors', 'morgan', 'compression', 'bodyparser', 'hpp', 'helmet'], router);
routesLoader(routes, router);
if (process.env.NODE_ENV !== 'production') routesLoader(docs, router);
errorMiddlewareLoader(['notFound', 'clientError', 'serverError'], router);

export default app;
