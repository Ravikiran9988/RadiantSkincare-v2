const skinTypeService = require('./skinTypeService');
const skinConcernService = require('./skinConcernService');
const skinSignalsService = require('./skinSignalsService');

class AIOrchestrator {
  /**
   * Analyzes the given image based on the requested analysis type.
   * @param {string} analysisType - 'Complete Skin Analysis', 'Skin Type', 'Skin Concerns', 'Skin Health'
   * @param {Buffer} imageBuffer - The raw image buffer
   * @returns {Promise<Object>} - The Unified AI Skin Profile
   */
  async analyzeSkin(analysisType, imageBuffer) {
    let profile = {
      skinType: null,
      skinTypeConfidence: 0,
      screeningConcerns: [],
      skinSignals: null,
      warnings: []
    };

    // Determine which models to run based on analysisType
    const runType = analysisType === 'Complete Skin Analysis' || analysisType === 'Skin Type';
    const runConcern = analysisType === 'Complete Skin Analysis' || analysisType === 'Skin Concerns';
    const runSignals = analysisType === 'Complete Skin Analysis' || analysisType === 'Skin Health';

    // Execute required models concurrently
    const promises = [];

    if (runType) {
      promises.push(
        skinTypeService.analyze(imageBuffer)
          .then(res => {
            if (res) {
              profile.skinType = res.label;
              profile.skinTypeConfidence = res.confidence;
            }
          })
          .catch(err => {
            profile.warnings.push('Skin Type analysis is temporarily unavailable.');
          })
      );
    }

    if (runConcern) {
      promises.push(
        skinConcernService.analyze(imageBuffer)
          .then(res => {
            profile.screeningConcerns = res;
          })
          .catch(err => {
            profile.warnings.push('Skin Concern screening is temporarily unavailable.');
          })
      );
    }

    if (runSignals) {
      promises.push(
        skinSignalsService.analyze(imageBuffer)
          .then(res => {
            profile.skinSignals = res;
          })
          .catch(err => {
            profile.warnings.push('Skin health signal analysis is temporarily unavailable.');
          })
      );
    }

    await Promise.all(promises);

    return profile;
  }
}

module.exports = new AIOrchestrator();
