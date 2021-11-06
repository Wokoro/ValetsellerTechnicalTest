/**
 * @author - wokorosamuel@yahoo.com
 */

/**
 * @class
 *
 * @description - An abstract class for server side errors.
 */
export class HttpServerError extends Error {
  /**
   * @constructor
   *
   * @param {string} message - Error message to return.
   *
   * @param {number} status - HTTP status code to return.
   */
  constructor(message = 'HTTPServerError occurred!') {
    super(message);

    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @description - A setter function to set message property
   *
   * @param {string | object} str - Error message either and object or a string
   */
  set message(str) {
    if (str instanceof Object) {
      this.message = JSON.stringify(str);
    } else {
      this.message = str;
    }
  }
}
