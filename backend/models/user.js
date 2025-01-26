const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: {
    type: String, trim: true, required: true, unique: true,
  },
  password: { type: String, required: true },
  isVerified: { type: Boolean, required: true, default: false },

}, { versionKey: false });

// Hash the user's password before saving if it
userSchema.pre('save', async function hashpassword(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.comparePassword = async function compare(password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};
module.exports = mongoose.model('User', userSchema);
