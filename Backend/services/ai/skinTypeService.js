const hfService = require('../hfService');

class SkinTypeService {
  constructor() {
    this.modelName = process.env.HF_SKIN_TYPE_MODEL || 'Raveem/SkinSight';
  }

  async analyze(imageBuffer) {
    try {
      const results = await hfService.inferImage(this.modelName, imageBuffer);
      
      // Hugging Face image classification returns an array of { label, score }
      if (Array.isArray(results) && results.length > 0) {
        // Find the highest confidence prediction
        const topResult = results[0];
        
        // Map classes if necessary. Raveem/SkinSight typically uses Oily, Dry, Normal.
        const label = topResult.label || 'Normal';
        
        return {
          label: label,
          confidence: topResult.score || topResult.confidence || 0,
        };
      }
      return null;
    } catch (error) {
      console.error('SkinTypeService Error:', error.message);
      throw error;
    }
  }
}

module.exports = new SkinTypeService();
