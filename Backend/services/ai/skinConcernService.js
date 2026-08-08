const hfService = require('../hfService');

class SkinConcernService {
  constructor() {
    this.modelName = process.env.HF_SKIN_CONCERN_MODEL || 'LaurianeMD/vit-skin-disease';
  }

  async analyze(imageBuffer) {
    try {
      const results = await hfService.inferImage(this.modelName, imageBuffer);
      
      // Expected Hugging Face format: array of { label, score }
      if (Array.isArray(results)) {
        // Return top 2 concerns that exceed a small threshold
        const concerns = results
          .filter(r => (r.score || r.confidence) > 0.1)
          .sort((a, b) => (b.score || b.confidence) - (a.score || a.confidence))
          .slice(0, 2)
          .map(r => ({
            label: `AI screening detected features associated with ${r.label}`,
            confidence: r.score || r.confidence
          }));
        
        return concerns.length > 0 ? concerns : [{ label: 'No significant concerns detected', confidence: 0.9 }];
      }
      return [];
    } catch (error) {
      console.error('SkinConcernService Error:', error.message);
      throw error;
    }
  }
}

module.exports = new SkinConcernService();
