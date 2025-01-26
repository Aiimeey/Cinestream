const express = require('express');
const { create, verifyEmail, signIn } = require('../controllers/user');
const { userValidator, validate, signInValidator } = require('../middlewares/validator');

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/sign-in', signInValidator, validate, signIn);

module.exports = router;
