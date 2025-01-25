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
