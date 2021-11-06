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

export default [
  morganHandler,
  bodyParserHandler,
  compressionHandler,
  corsHandler,
  hppHandler,
  helmetHandler
];
