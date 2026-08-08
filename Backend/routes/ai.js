const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const aiOrchestrator = require('../services/ai/orchestrator');
const llmService = require('../services/ai/llmService');

// POST /api/ai/analyze-skin
router.post('/analyze-skin', upload.single('image'), async (req, res) => {
  try {
    const analysisType = req.body.analysisType || 'Complete Skin Analysis';
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required for AI analysis' });
    }

    // Read file buffer. (Using multer memory storage or disk storage)
    // If disk storage, we read it:
    const fs = require('fs');
    let imageBuffer;
    if (req.file.buffer) {
      imageBuffer = req.file.buffer;
    } else if (req.file.path) {
      imageBuffer = fs.readFileSync(req.file.path);
    } else {
      return res.status(500).json({ success: false, message: 'Could not process uploaded image' });
    }

    const profile = await aiOrchestrator.analyzeSkin(analysisType, imageBuffer);
    
    // Cleanup temporary image if it was saved to disk
    if (req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to cleanup temp image:', err);
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ success: false, message: 'AI Analysis failed', error: error.message });
  }
});

// POST /api/ai/explain-results
router.post('/explain-results', async (req, res) => {
  try {
    const { skinProfile, recommendedProducts, routineTips } = req.body;
    
    if (!skinProfile) {
      return res.status(400).json({ success: false, message: 'skinProfile is required' });
    }

    const explanation = await llmService.generateExplanation({
      skinProfile,
      recommendedProducts,
      routineTips
    });

    res.json({
      success: true,
      explanation
    });
  } catch (error) {
    console.error('LLM Explanation Error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate explanation', error: error.message });
  }
});

module.exports = router;
