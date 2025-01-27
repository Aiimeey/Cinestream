const { check, validationResult } = require('express-validator');
// Validator for user ( express-validator has its own in-memory store to track the errors)
exports.userValidator = [
  check('name').trim().not().isEmpty()
    .withMessage('name is missing'),
  check('email').normalizeEmail().isEmail().withMessage('Email is invalid'),
  check('password').trim().not().isEmpty()
    .withMessage('Password is missing')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be 8 to 20 characters long'),
];

// gathering all the validation errors from the req & putting them into an array called error
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) return res.json({ error: error[0].msg });
  return next();
};

exports.signInValidator = [
  check('email').normalizeEmail().isEmail().withMessage('Email is invalid!'),
  check('password').trim().not().isEmpty()
    .withMessage('Password is missing!'),
];

exports.validatePassword = [
  check('newPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is missing!')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be 8 to 20 characters long!'),
];
