const crypto = require('crypto');

// Sends a standardized error response with a custom status code
exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};
// Generate random 30-byte hexadecimal string
exports.generateRandomByte = () => new Promise((resolve, reject) => {
  crypto.randomBytes(30, (err, randomByte) => {
    if (err) reject(err);
    const data = randomByte.toString('hex');
    resolve(data);
  });
});
