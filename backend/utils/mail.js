// Generate a random OTP
exports.generateOTP = (otp_length = 6) => {
    let OTP = '';
    for (let i = 1; i <= otp_length; i += 1) {
      const randomVal = Math.round(Math.random() * 9);
      OTP += randomVal;
    }
    return OTP;
  };
  