const User = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone number is required" });

  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  try {
    let user = await User.findOne({ phone });
    if (user) {
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
    } else {
      user = new User({ phone, otp, otpExpiresAt });
    }

    await user.save();

    // TODO: Integrate with SMS provider (e.g., Twilio)
    res.json({ message: "OTP sent successfully", otp }); // Include OTP for testing
  } catch (err) {
    console.error("sendOtp error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone and OTP are required" });
  }

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.otp !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.json({ message: "OTP verified successfully", next: "/register-info" });
  } catch (err) {
    console.error("verifyOtp error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.defineRole = async (req, res) => {
  const { phone, role } = req.body;

  if (!phone || !role) {
    return res.status(400).json({ error: "Phone and role are required" });
  }

  try {
    const user = await User.findOne({ phone });

    if (!user || !user.isVerified) {
      return res.status(400).json({ error: "User not verified" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "Role defined successfully" });
  } catch (error) {
    console.error("defineRole error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.registerInfo = async (req, res) => {
  const { phone, name, email, password, country } = req.body;
  if (!phone || !name || !email || !password || !country) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    let user = await User.findOne({ phone });
    if (!user || !user.isVerified) {
      return res.status(400).json({ error: "User not verified" });
    }

    user.name = name;
    user.email = email;

    // Hash password before saving
    user.password = await bcrypt.hash(password, 10);
    user.country = country;

    await user.save();

    res.json({ message: "User registered successfully", next: "/login" });
  } catch (err) {
    console.error("registerInfo error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',

    });

    res.status(200).json({ message: 'Login successful', token , role: user.role });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    res.status(200).json({ success: true, message: "Email verified" });
  } catch (err) {
    console.error("verifyEmail error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📁 userController.js
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password -otp -otpExpiresAt -__v");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("getUserProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
