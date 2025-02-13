const nodemailer = require('nodemailer');
// Generate a random OTP
exports.generateOTP = (otpLength = 6) => {
  let OTP = '';
  for (let i = 1; i <= otpLength; i += 1) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  return OTP;
};

//  mail transporter for sending emails using Mailtrap
exports.generateMailTransporter = () => nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAIL_TRAP_USER,
    pass: process.env.MAIL_TRAP_PASSWORD,
  },
});
