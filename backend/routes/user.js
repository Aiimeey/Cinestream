const express = require('express');
const {
  create, verifyEmail, signIn, resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
} = require('../controllers/user');
const { userValidator, validate, signInValidator } = require('../middlewares/validator');
const { isValidPassResetToken } = require('../middlewares/user');

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/sign-in', signInValidator, validate, signIn);
router.post('/resend-email-verification-token', resendEmailVerificationToken);
router.post('/forget-password', forgetPassword);
router.post('/verify-pass-reset-token', isValidPassResetToken, sendResetPasswordTokenStatus);
module.exports = router;
