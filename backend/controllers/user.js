const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');
const User = require('../models/user');
const EmailVerificationToken = require('../models/emailVerificationToken');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError } = require('../utils/helper');

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });

  if (oldUser) return sendError(res, 'This email is already in use!');

  const newUser = new User({ name, email, password });
  await newUser.save();

  const OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({ owner: newUser._id, token: OTP });

  await newEmailVerificationToken.save();

  // Send email with OTP for user email verification
  const transport = generateMailTransporter();

  transport.sendMail({
    from: 'no-reply@cinestream.com',
    to: newUser.email,
    subject: 'Email Verification',
    html: `
    <div style="border:1px; width:87%;box-shadow: 0px 4px 8px silver;padding:10px; margin-left:auto; margin-right:auto;text-align:center">
    <h2>Your verification OTP</h2>
    <h2 style="color:salmon">${OTP}</h2>
    </div>
    `,
  });

  return res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,

    },
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, 'Invalid user!');

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'user not found!', 404);

  if (user.isVerified) return sendError(res, 'user is already verified!');

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return sendError(res, 'token not found!');

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return sendError(res, 'Please submit a valid OTP!');

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  const transport = generateMailTransporter();
  transport.sendMail({
    from: 'no-reply@cinestream.com',
    to: user.email,
    subject: 'Welcome Email',
    html: `
    <div style="border:1px; width:87%;box-shadow: 0px 4px 8px silver;padding:15px;  margin-left:auto; margin-right:auto;text-align:center">
    <h2>Welcome to our app</h2>
    <h2 style="color:salmon">your account is verified successfully</h2>
    </div>
    `,
  });

  return res.json({ message: 'Your email is verified.' });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, 'Email/Password mismatch!');

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, 'Email/Password mismatch!');

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return res.json({
    user: {
      id: user._id, name: user.name, email, token: jwtToken,
    },
  });
};
