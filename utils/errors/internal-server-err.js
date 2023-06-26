const { STATUS_CODES } = require('../STATUS_CODES');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
