/**
 * @author - Wokoro Douye Samuel
 */

import dotenv from 'dotenv';
dotenv.config();

const { DOCS_ROOT_REF = './dist' } = process.env
// Swagger definition
const swaggerDefinition = {
  basePath: '/api/v1',
  info: {
    title: 'Test API',
    version: '1.0.0',
    description: 'Valetseller Technical Test',
  }
};

// options for the swagger docs
const options = {
  swaggerDefinition,
  apis: [`${DOCS_ROOT_REF}/docs/**/*.yaml`]
};

export default options;
