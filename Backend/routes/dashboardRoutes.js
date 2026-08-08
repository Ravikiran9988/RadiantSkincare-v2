const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User1');

// GET /api/dashboard/data - Fetch user's routine checklist, analysis history, and profile
router.get('/dashboard/data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email analysisHistory routineChecklist consultations');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Default routine steps if checklist is empty
    let checklist = user.routineChecklist || [];
    if (checklist.length === 0) {
      checklist = [
        { step: 'Morning Gentle Cleanser', done: false },
        { step: 'Hydrating Serum / Niacinamide', done: false },
        { step: 'SPF 50+ Broad Spectrum Sunscreen', done: false },
        { step: 'Evening Cleansing & Makeup Removal', done: false },
        { step: 'Moisturizer & Barrier Repair Cream', done: false },
      ];
      user.routineChecklist = checklist;
      await user.save();
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      routineChecklist: checklist,
      analysisHistory: user.analysisHistory || [],
      consultations: user.consultations || [],
    });
  } catch (err) {
    console.error('Dashboard Data Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' });
  }
});

// POST /api/dashboard/update-checklist - Update routine checklist items
router.post('/dashboard/update-checklist', auth, async (req, res) => {
  const { checklist } = req.body;
  if (!Array.isArray(checklist)) {
    return res.status(400).json({ success: false, message: 'Checklist must be an array' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.routineChecklist = checklist;
    await user.save();

    res.json({ success: true, message: 'Checklist updated', routineChecklist: user.routineChecklist });
  } catch (err) {
    console.error('Update Checklist Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to update checklist' });
  }
});

// POST /api/dashboard/add-history - Append new AI analysis history item
router.post('/dashboard/add-history', auth, async (req, res) => {
  const { entry } = req.body;
  if (!entry) {
    return res.status(400).json({ success: false, message: 'Entry object required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.analysisHistory) user.analysisHistory = [];
    user.analysisHistory.push({
      skinIssues: entry.skinIssues || 'General Screening',
      result: entry.result || 'No disease identified',
      date: new Date()
    });

    await user.save();
    res.json({ success: true, message: 'Analysis history saved', analysisHistory: user.analysisHistory });
  } catch (err) {
    console.error('Add History Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to add analysis history' });
  }
});

module.exports = router;
