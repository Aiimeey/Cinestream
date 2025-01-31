const express = require('express');
const {
  create, verifyEmail, signIn, resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
} = require('../controllers/user');
const {
  userValidator, validate, signInValidator, validatePassword,
} = require('../middlewares/validator');
const { isValidPassResetToken } = require('../middlewares/user');
const { isAuth } = require('../middlewares/auth');

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/sign-in', signInValidator, validate, signIn);
router.post('/resend-email-verification-token', resendEmailVerificationToken);
router.post('/forget-password', forgetPassword);
router.post('/verify-pass-reset-token', isValidPassResetToken, sendResetPasswordTokenStatus);
router.post('/reset-password', validatePassword, validate, isValidPassResetToken, resetPassword);
router.get('/is-auth', isAuth, (req, res) => {
  const { user } = req;
  return res.json({
    user: {
      id: user._id, name: user.name, email: user.email, isVerified: user.isVerified,
    },
  });
});
module.exports = router;
