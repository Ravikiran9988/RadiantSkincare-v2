const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User1');
const Otp = require('../models/Otp');
const sendEmail = require('../utils/sendEmail');
const authMiddleware = require('../middleware/auth');

// POST /register - Register & send OTP
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
  }

  try {
    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashed,
      otp: otpCode,
      isVerified: false
    });

    await user.save();

    // Store in Otp collection with TTL expiry
    await Otp.create({
      email: email.trim().toLowerCase(),
      otp: otpCode
    });

    await sendEmail(
      email.trim(),
      'Verify your Radiant Skincare account',
      `Your verification OTP for Radiant Skincare is ${otpCode}. It is valid for 5 minutes.`
    );

    res.status(201).json({ success: true, message: 'OTP sent to your email', email: email.trim().toLowerCase() });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});

// POST /verify-otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  try {
    const cleanEmail = email.trim().toLowerCase();
    const otpDoc = await Otp.findOne({ email: cleanEmail, otp: otp.trim() });
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!otpDoc && user.otp !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    if (otpDoc) {
      await Otp.deleteOne({ _id: otpDoc._id });
    }

    res.json({ success: true, message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    console.error('OTP Verification Error:', err);
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: 'Please verify your email first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: 'user' },
      process.env.JWT_SECRET || 'dev_jwt_secret_key_radiant_skincare_2026',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Login error' });
  }
});

// GET /user/me
router.get('/user/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email isVerified');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, username: user.username, email: user.email, isVerified: user.isVerified });
  } catch (err) {
    console.error('Fetch Profile Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /user/update-profile
router.put('/user/update-profile', authMiddleware, async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ success: false, message: 'Username and email are required' });
  }

  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        username: username.trim(),
        email: email.trim().toLowerCase()
      },
      { new: true, runValidators: true }
    ).select('username email');

    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated successfully', username: updated.username, email: updated.email });
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ success: false, message: 'Error updating profile' });
  }
});

// PUT /user/change-password
router.put('/user/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Current and new password are required' });
  }

  try {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect current password' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change Password Error:', err);
    res.status(500).json({ success: false, message: 'Error changing password' });
  }
});

module.exports = router;
