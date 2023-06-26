const { STATUS_CODES } = require('../STATUS_CODES');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundError;
