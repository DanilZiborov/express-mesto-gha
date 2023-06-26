const { STATUS_CODES } = require('../STATUS_CODES');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
