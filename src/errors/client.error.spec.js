/**
 * @author - wokorosamuel@yahoo.com
 */

/**
 * @class
 *
 * @description - An abstract class for client side errors.
 */
export class HttpClientError extends Error {
  /**
   * @constructor
   *
   * @param {string} message - Error message to return.
   *
   * @param {number} status - HTTP status code to return.
   */
  constructor(message = 'HTTPClientError occured!') {
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

/**
 * @class
 *
 * @description - Class for HTTP400 error
 */
export class Http400Error extends HttpClientError {
  /**
   * @description - Constructor function for HTTP400 error
   *
   * @param {String} message
   *
   * @param {Number} status
   */
  constructor(message = 'Bad request', status = 400) {
    super(message);
    this.status = status;
  }
}

/**
 * @class
 *
 * @description - Class for HTTP404 error
 */
export class Http404Error extends HttpClientError {
  /**
   * @description - Constructor function for HTTP404 error
   *
   * @param {String} message
   *
   * @param {Number} status
   */
  constructor(message = 'Not found', status = 404) {
    super(message);
    this.status = status;
  }
}

/**
 * @class
 *
 * @description - Class for invalid user inputs
 */
export class Http406Error extends HttpClientError {
  /**
  * @contructor
  *
  * @param {string} message - Error message to be passed.
  *
  * @param {number} status - Error status code.
  */
  constructor(message = 'Invalid user Input', status = 406) {
    super(message);
    this.status = status;
  }
}
