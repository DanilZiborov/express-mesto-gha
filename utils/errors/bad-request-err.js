const { STATUS_CODES } = require('../STATUS_CODES');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
