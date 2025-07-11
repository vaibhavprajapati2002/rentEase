const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otpSessionId: { type: String, default: null }, // 2Factor session ID replaces manual OTP
  isVerified: { type: Boolean, default: false },
  role: { type: String },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  country: { type: String },

  fatherName: { type: String, default: "" },
  permanentAddress: { type: String, default: "" },
  gender: { type: String, enum: ["Male", "Female", "other"] },
  dob: Date,
  profileImage: { type: String, default: "" },

  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    default: null,
  },
  termsAndConditions: {
    type: String,
    default: "",
  },
  privacyAndPolicy: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model('User', userSchema);
