const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User1');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

// GET /api/chat/history/:consultationId
router.get('/history/:consultationId', auth, async (req, res) => {
  const { consultationId } = req.params;

  try {
    const messages = await Message.find({ consultation: consultationId }).sort({ timestamp: 1 });
    if (messages && messages.length > 0) {
      return res.json({ success: true, data: messages });
    }

    // Fallback: Query Chat collection by room/ID
    const chatLogs = await Chat.find({
      $or: [{ from: consultationId }, { to: consultationId }]
    }).sort({ timestamp: 1 });

    res.json({ success: true, data: chatLogs });
  } catch (err) {
    console.error('Chat History Error:', err);
    res.status(500).json({ success: false, message: 'Server error loading chat history' });
  }
});

module.exports = router;
