const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');
const User = require('../models/User1');
const authMiddleware = require('../middleware/auth');

// Get routine
router.get('/', authMiddleware, async (req, res) => {
  try {
    const routine = await Routine.findOne({ userId: req.user.id });
    res.json({ success: true, steps: routine ? routine.steps : [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching routine' });
  }
});

// Save/update routine
router.post('/', authMiddleware, async (req, res) => {
  const { steps } = req.body;
  if (!Array.isArray(steps)) {
    return res.status(400).json({ success: false, message: 'Steps must be an array' });
  }

  try {
    let routine = await Routine.findOne({ userId: req.user.id });
    if (!routine) {
      routine = new Routine({ userId: req.user.id, steps });
    } else {
      routine.steps = steps;
    }
    await routine.save();
    res.json({ success: true, message: 'Routine updated successfully', steps: routine.steps });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving routine' });
  }
});

module.exports = router;
