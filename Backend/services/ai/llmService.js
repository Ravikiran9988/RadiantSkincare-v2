const axios = require('axios');

/**
 * Service to interact with Hugging Face LLM for skin analysis explanation.
 * Enforces strict safety boundaries.
 */
class LLMService {
  constructor() {
    this.hfToken = process.env.HF_TOKEN;
    this.modelId = process.env.HF_LLM_MODEL || 'meta-llama/Meta-Llama-3-8B-Instruct';
    // Using the Hugging Face Serverless Inference API for chat completion
    this.apiUrl = `https://api-inference.huggingface.co/models/${this.modelId}/v1/chat/completions`;
  }

  async generateExplanation(data) {
    if (!this.hfToken || this.hfToken === 'hf_dummy_token_replace_me') {
      console.warn('HF_TOKEN is missing or invalid. Using fallback explanation.');
      return this._getFallbackExplanation(data);
    }

    const systemPrompt = `You are an AI Skincare Assistant. Your job is to explain the provided AI vision results and product recommendations to the user in a friendly, concise, and easy-to-understand way.

CRITICAL RULES:
1. Do NOT diagnose any medical conditions.
2. Do NOT override the vision predictions or product recommendations.
3. Do NOT invent new products, ingredients, or confidence values.
4. Do NOT make medical claims or promise cures.
5. Remind the user that this is for informational purposes only.
6. Keep the response to 2-3 short paragraphs maximum.`;

    const userContent = `Here are the results to explain:
Skin Profile: ${JSON.stringify(data.skinProfile, null, 2)}
Recommended Products: ${JSON.stringify(data.recommendedProducts, null, 2)}
Routine Tips: ${JSON.stringify(data.routineTips, null, 2)}`;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.modelId,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent }
          ],
          max_tokens: 300,
          temperature: 0.3 // Keep it deterministic and safe
        },
        {
          headers: {
            'Authorization': `Bearer ${this.hfToken}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content;
      }
      
      throw new Error('Invalid response format from Hugging Face API');
    } catch (error) {
      console.error('LLM Inference Error:', error.response?.data || error.message);
      // Fallback gracefully on API errors (e.g., model loading, rate limits)
      return this._getFallbackExplanation(data);
    }
  }

  _getFallbackExplanation(data) {
    let explanation = "Based on your AI Skin Profile, we've matched you with a personalized skincare routine designed to address your specific needs. ";
    
    if (data.recommendedProducts && data.recommendedProducts.length > 0) {
      explanation += `Your recommended foundational products include items like the ${data.recommendedProducts[0].product_name}. `;
    }
    
    explanation += "Please refer to the detailed AI Skin Profile metrics and product list below. Remember, this screening is for informational purposes and is not a medical diagnosis.";
    
    return explanation;
  }
}

module.exports = new LLMService();
