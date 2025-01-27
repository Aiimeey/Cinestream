const { isValidObjectId } = require('mongoose');
const { sendError } = require('../utils/helper');
const passwordResetToken = require('../models/passwordResetToken');

exports.isValidPassResetToken = async (req, res, next) => {
  const { token, userId } = req.body;
  if (!token.trim() || !isValidObjectId(userId)) return sendError(res, 'Invalid request!');
  const resetToken = await passwordResetToken.findOne({ owner: userId });
  if (!resetToken) return sendError(res, 'Unauthorized access, Invalid request!!');
  const matched = resetToken.compareToken(token);
  if (!matched) return sendError(res, 'Unauthorized access, Invalid request!!!');
  req.resetToken = resetToken;
  return next();
};
