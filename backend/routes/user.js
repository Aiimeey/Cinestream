const express = require('express');
const {
  create, verifyEmail, signIn, resendEmailVerificationToken,
} = require('../controllers/user');
const { userValidator, validate, signInValidator } = require('../middlewares/validator');

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/sign-in', signInValidator, validate, signIn);
router.post('/resend-email-verification-token', resendEmailVerificationToken);

module.exports = router;
