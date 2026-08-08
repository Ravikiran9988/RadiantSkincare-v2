const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Consultation = require('../models/Consultation');
const authenticateDoctor = require('../middleware/authenticateDoctor');

// GET /api/doctor/me - Get logged-in doctor profile
router.get('/me', authenticateDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctorId);
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    console.error('Doctor Profile Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error fetching doctor profile' });
  }
});

// GET /api/doctor/consultations - Get all consultations assigned to logged-in doctor
router.get('/consultations', authenticateDoctor, async (req, res) => {
  try {
    const consultations = await Consultation.find({ doctorId: req.doctorId })
      .populate('userId', 'username email')
      .sort({ date: -1 });

    const formatted = consultations.map(c => ({
      _id: c._id,
      userId: c.userId?._id,
      userName: c.userId?.username || 'Patient',
      userEmail: c.userId?.email || '',
      doctorId: c.doctorId,
      date: c.date,
      concern: c.concern || 'General Consultation',
      status: c.status
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Doctor Consultations Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error fetching consultations' });
  }
});

module.exports = router;
