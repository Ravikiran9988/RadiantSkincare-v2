const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const doctor = await Doctor.findOne({ email: email.trim().toLowerCase() }).select('+password');
    if (!doctor) {
      return res.status(400).json({ success: false, message: 'Doctor account not found' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: doctor._id, role: 'doctor' },
      process.env.JWT_SECRET || 'dev_jwt_secret_key_radiant_skincare_2026',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        avatar: doctor.avatar,
        specialization: doctor.specialization,
        experience: doctor.experience,
        languages: doctor.languages,
      },
    });
  } catch (err) {
    console.error('Doctor Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

module.exports = router;
