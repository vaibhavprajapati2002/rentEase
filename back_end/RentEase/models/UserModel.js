const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  isVerified: { type: Boolean, default: false },
  role: { type: String},
  name: { type: String },
  email: { type: String},
  password: { type: String },
  country: { type: String },
});

module.exports = mongoose.model('User', userSchema);
