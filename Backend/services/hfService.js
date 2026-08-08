const axios = require('axios');

/**
 * Service to handle requests to Hugging Face Inference API.
 */
class HuggingFaceService {
  constructor() {
    this.token = process.env.HF_TOKEN;
    this.baseUrl = 'https://api-inference.huggingface.co/models/';
  }

  /**
   * Calls a Hugging Face image classification model.
   * @param {string} modelName - The model identifier (e.g., 'Raveem/SkinSight')
   * @param {Buffer} imageBuffer - The raw image buffer
   * @returns {Promise<any>} - The JSON response from the model
   */
  async inferImage(modelName, imageBuffer) {
    if (!this.token) {
      throw new Error('HF_TOKEN is not configured in the environment.');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}${modelName}`,
        imageBuffer,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/octet-stream',
          },
          // Hugging Face sometimes needs to load the model (returns 503 with estimated_time).
          // We can handle retries or just return the response to let the orchestrator handle it.
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 503) {
        // Model is loading. In a production app, we might retry after `estimated_time`.
        // For simplicity in this demo, we'll throw a specific error.
        throw new Error(`Model ${modelName} is currently loading. Please try again in a moment.`);
      }
      console.error(`HF API Error (${modelName}):`, error.response ? error.response.data : error.message);
      throw new Error(`Inference failed for model ${modelName}`);
    }
  }
}

module.exports = new HuggingFaceService();
