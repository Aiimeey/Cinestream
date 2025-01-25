const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const emailVerificationTokenSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: {
    type: String, trim: true, required: true, unique: true,
  },
  createdAt: { type: Date, expires: 300, default: Date.now() },

}, { versionKey: false });

emailVerificationTokenSchema.pre('save', async function (next) {
  if (this.isModified('token')) {
    this.token = await bcrypt.hash(this.token, 10);
  }
  next();
});

module.exports = mongoose.model('emailVerificationToken', emailVerificationTokenSchema);
