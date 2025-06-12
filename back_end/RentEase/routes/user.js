const express = require('express');
const router = express.Router();
const {sendOtp, verifyOtp, defineRole, registerInfo, loginUser, verifyEmail, resetPassword, getUserProfile } = require('../controller/userController');
const auth = require('../middleware/auth');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/define-role', defineRole);
router.post('/register-info', registerInfo); 
router.post('/verify-email', verifyEmail); // Add verify email route
router.post('/reset-password', resetPassword); // Add reset password route
router.post('/login', loginUser); // Add login route
router.get('/me', auth, getUserProfile);

module.exports = router;
