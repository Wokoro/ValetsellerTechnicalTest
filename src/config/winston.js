/**
 * @author - wokorosamuel@yahoo.com
 */

import winston from 'winston';
import path from 'path';

var options = {
  file: {
    level: 'info',
    filename: path.join(__dirname, '../logs/app.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

let logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file)
  ],
  exitOnError: false
});

logger.stream = {
  write: message => {
    logger.info(message);
  },
};

export default { logger };
