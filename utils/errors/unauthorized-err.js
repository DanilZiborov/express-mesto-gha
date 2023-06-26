const { STATUS_CODES } = require('../STATUS_CODES');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
