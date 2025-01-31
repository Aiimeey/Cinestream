const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');
const User = require('../models/user');
const EmailVerificationToken = require('../models/emailVerificationToken');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError, generateRandomByte } = require('../utils/helper');
const PasswordResetToken = require('../models/passwordResetToken');

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
    <div style="border:1px; width:87%;box-shadow: 0px 4px 8px silver;padding:10px;  margin-left:auto; margin-right:auto;text-align:center">
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

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  return res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
      isVerified: user.isVerified,
    },
    message: 'Your email is verified.',
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, 'Email/Password mismatch!');

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, 'Email/Password mismatch!');

  const { _id, name, isVerified } = user;

  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

  return res.json({
    user: {
      id: _id, name, email, token: jwtToken, isVerified,
    },
  });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'user not found!', 404);

  if (user.isVerified) return sendError(res, 'This email is already verified!');

  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHasToken) return sendError(res, 'Only after 5 min you can request for another token!');

  const OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({ owner: user._id, token: OTP });

  await newEmailVerificationToken.save();

  const transport = generateMailTransporter();

  transport.sendMail({
    from: 'no-reply@cinestream.com',
    to: user.email,
    subject: 'Email Verification',
    html: `
    <div style="border:1px; width:87%;box-shadow: 0px 4px 8px silver;padding:10px;  margin-left:auto; margin-right:auto;text-align:center">
    <h2>Your verification OTP</h2>
    <h2 style="color:salmon">${OTP}</h2>
    </div>
    `,
  });

  return res.json({
    message: 'New OTP has been sent to your registered email accout.',
  });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, 'email is missing');
  const user = await User.findOne({ email });
  if (!user) return sendError(res, 'User not found!', 404);

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken) return sendError(res, 'Only after 5 min you can request for another token!');

  const token = await generateRandomByte();
  const newPasswordResetToken = await new PasswordResetToken({ owner: user._id, token });
  await newPasswordResetToken.save();
  const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;

  const transport = generateMailTransporter();
  transport.sendMail({
    from: 'no-reply@cinestream.com',
    to: user.email,
    subject: 'Reset Password Link',
    html: `
  <div style="border:1px; width:87%;box-shadow: 0px 4px 8px silver;padding:15px;  margin-left:auto; margin-right:auto;text-align:center;font-family:system-ui">
  <h2>Click here to change password</h2>
  <a href="${resetPasswordUrl}" style="color:white; text-decoration: none;background-color: salmon;padding: 14px 25px;  display: inline-block;">Change Password</a>
  </div>
  `,
  });
  return res.json({ message: 'Link sent to your email' });
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  if (matched) {
    return sendError(
      res,
      'The new password must be different from the old one!',
    );
  }

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  const transport = generateMailTransporter();

  transport.sendMail({
    from: 'security@reviewapp.com',
    to: user.email,
    subject: 'Password Reset Successfully',
    html: `
    <div style="border:1px; width:87%;box-shadow: 0px 4px 8px silver; padding:15px; margin-left:auto; margin-right:auto;text-align:center">
    <h2>Password Reset Successfully</h2>
    <h2 style="color:salmon">Now you can login with new password</h2>
    </div>
    `,
  });

  return res.json({
    message: 'Password reset successfully, now you can login with new password.',
  });
};
