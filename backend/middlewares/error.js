// general error-handling middleware
/* eslint-disable no-unused-vars */
exports.errorHandler = (err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    message: err.message || 'Something went wrong. Please try again later.',
  });
};
