const User = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

// 📲 Send OTP using 2Factor API
exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone number is required" });

  try {
    // ✅ Call 2Factor SMS API to send OTP
    const apiKey = process.env.TWOFACTOR_API_KEY;
    const response = await axios.get(`https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN`);

    if (response.data.Status !== "Success") {
      return res.status(500).json({ error: "Failed to send OTP" });
    }

    const sessionId = response.data.Details;

    // ✅ Save sessionId to DB
    let user = await User.findOne({ phone });
    if (user) {
      user.otpSessionId = sessionId;
    } else {
      user = new User({ phone, otpSessionId: sessionId });
    }

    await user.save();

    res.json({ message: "OTP sent successfully", sessionId, phone });

  } catch (err) {
    console.error("sendOtp error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Error sending OTP" });
  }
};

// 📲 Verify OTP using 2Factor API
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ error: "Phone and OTP are required" });

  try {
    const user = await User.findOne({ phone });
    if (!user || !user.otpSessionId) {
      return res.status(400).json({ error: "Session not found. Please request OTP again." });
    }

    const apiKey = process.env.TWOFACTOR_API_KEY;
    const verifyUrl = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${user.otpSessionId}/${otp}`;
    const response = await axios.get(verifyUrl);

    if (response.data.Status !== "Success") {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otpSessionId = null;
    await user.save();

    res.json({ message: "OTP verified successfully", next: "/register-info" });

  } catch (err) {
    console.error("verifyOtp error:", err?.response?.data || err.message);
    res.status(500).json({ error: "OTP verification failed" });
  }
};

// 🧑‍💼 Define Role
exports.defineRole = async (req, res) => {
  const { phone, role } = req.body;
  if (!phone || !role) return res.status(400).json({ error: "Phone and role are required" });

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

// 📝 Register Additional Info
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
    user.password = await bcrypt.hash(password, 10);
    user.country = country;

    await user.save();

    res.json({ message: "User registered successfully", next: "/login" });
  } catch (err) {
    console.error("registerInfo error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔐 Login
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

    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
      _id: user._id
    });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✉️ Verify Email
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

// 🔒 Reset Password
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 👤 Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password -otpSessionId -__v");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("getUserProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
