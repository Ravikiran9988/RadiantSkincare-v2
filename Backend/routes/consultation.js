const express = require('express');
const router = express.Router();
const User = require('../models/User1');
const Doctor = require('../models/Doctor');
const Consultation = require('../models/Consultation');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// GET /api/consultation/doctors - Get all active doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().select('name avatar specialization experience languages email');
    res.json({ success: true, data: doctors });
  } catch (err) {
    console.error('Fetch doctors error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch doctors' });
  }
});

// POST /api/consultation/book - Book consultation
router.post('/book', auth, async (req, res) => {
  const { dateTime, concern, doctorId } = req.body;

  if (!dateTime) {
    return res.status(400).json({ success: false, message: 'Date and time are required' });
  }

  try {
    let doctor;
    if (doctorId) {
      doctor = await Doctor.findById(doctorId);
    }

    if (!doctor) {
      const doctors = await Doctor.find();
      if (!doctors.length) {
        return res.status(500).json({ success: false, message: 'No doctors available at the moment' });
      }
      doctor = doctors[Math.floor(Math.random() * doctors.length)];
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // 1. Create Consultation document
    const consultation = new Consultation({
      userId: user._id,
      doctorId: doctor._id,
      date: new Date(dateTime),
      concern: concern || 'General Skincare Consultation',
      status: 'scheduled'
    });
    await consultation.save();

    // 2. Push to user's embedded array
    if (!user.consultations) {
      user.consultations = [];
    }
    user.consultations.push({
      doctorId: doctor._id,
      scheduledAt: new Date(dateTime)
    });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Consultation booked successfully',
      consultationId: consultation._id,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        avatar: doctor.avatar,
        languages: doctor.languages,
        specialization: doctor.specialization
      }
    });
  } catch (err) {
    console.error('Booking Error:', err);
    res.status(500).json({ success: false, message: 'Booking failed', error: err.message });
  }
});

// GET /api/consultation/:id - Get single consultation details
router.get('/:id', auth, async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate('userId', 'username email')
      .populate('doctorId', 'name avatar specialization');

    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }

    res.json({ success: true, data: consultation });
  } catch (err) {
    console.error('Fetch consultation error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch consultation' });
  }
});

// GET /api/consultation/:id/messages - Get chat messages for consultation
router.get('/:id/messages', auth, async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id).populate('userId', 'username');
    const messages = await Message.find({ consultation: req.params.id }).sort({ timestamp: 1 });

    const formattedMessages = messages.map(m => ({
      sender: m.senderType,
      content: m.content,
      time: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    res.json({
      success: true,
      messages: formattedMessages,
      patientName: consultation?.userId?.username || 'Patient'
    });
  } catch (err) {
    console.error('Fetch consultation messages error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

module.exports = router;
