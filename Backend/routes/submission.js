const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const UserSubmission = require('../models/submission');
const User = require('../models/User1');
const DashboardData = require('../models/DashboardData');

function generateRecommendations(skinType = '', skinIssues = '') {
  let tips = '';
  if (skinType === 'Oily') tips += 'Use a gel-based cleanser. ';
  if (skinType === 'Dry') tips += 'Use a hydrating cream cleanser. ';
  if (skinType === 'Combination') tips += 'Use a balancing cleanser. ';
  if (skinType === 'Sensitive') tips += 'Use fragrance-free products. ';

  const issues = (skinIssues || '').toLowerCase();
  if (issues.includes('acne')) tips += 'Include salicylic acid. ';
  if (issues.includes('redness')) tips += 'Try niacinamide. ';
  if (issues.includes('pigmentation')) tips += 'Use vitamin C. ';

  return tips.trim() || 'Maintain a standard balanced skincare routine with sunscreen.';
}

// POST /api/submit - Submit skin analysis data
router.post('/submit', verifyToken, upload.single('image'), async (req, res) => {
  const { skinType, skinIssues } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const Disease = generateRecommendations(skinType, skinIssues);

    const submission = new UserSubmission({
      userId: req.user.id,
      skinType: skinType || 'Normal',
      skinIssues: skinIssues || 'General Evaluation',
      imagePath,
      Disease
    });
    await submission.save();

    // Save to User1 model analysis history
    const user = await User.findById(req.user.id);
    if (user) {
      if (!user.analysisHistory) user.analysisHistory = [];
      user.analysisHistory.push({
        skinType: skinType || 'Normal',
        skinIssues: skinIssues || 'General Evaluation',
        result: Disease,
        date: new Date()
      });
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Skin analysis submitted successfully',
      data: {
        Disease,
        imagePath
      }
    });
  } catch (err) {
    console.error('Submission Error:', err);
    res.status(500).json({ success: false, message: 'Submission failed', error: err.message });
  }
});

module.exports = router;
