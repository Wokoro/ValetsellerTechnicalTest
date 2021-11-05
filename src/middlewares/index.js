/**
 * @author - wokorosamuel@yahoo.com
 */

import {
  bodyParserHandler,
  compressionHandler,
  corsHandler,
  morganHandler,
  hppHandler,
  helmetHandler
} from './common.handlers';

export default {
  morgan: morganHandler,
  bodyparser: bodyParserHandler,
  compression: compressionHandler,
  cors: corsHandler,
  hpp: hppHandler,
  helmet: helmetHandler
};
