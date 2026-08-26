const logger = require('../config/logger');

function errorHandler(error, req, res, next) {
  logger.error(
    {
      error: error.message,
      method: req.method,
      path: req.originalUrl
    },
    'Unhandled application error'
  );

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      error: error.message
    });
  }

  if (error.code === 'SQLITE_CONSTRAINT') {
    return res.status(400).json({
      error: 'Database constraint failed'
    });
  }

  return res.status(500).json({
    error: 'Internal server error'
  });
}

module.exports = errorHandler;