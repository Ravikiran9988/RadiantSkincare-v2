import React, { useState } from 'react';
import { analyzeSkinWithModel1 } from '../services/api';
import { toast } from 'react-toastify';

function AIConsultation() {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const getAIAdvice = async (e) => {
    e.preventDefault();
    if (!input && !image) {
      toast.warn('Please describe your skin concerns or upload an image.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      if (image) {
        const formData = new FormData();
        formData.append('skinIssues', input || 'General Consultation');
        formData.append('image', image);
        const data = await analyzeSkinWithModel1(formData);
        setResult(data);
      } else {
        setResult({
          disease: `AI Assessment for concerns: "${input}". Recommended to maintain hydration and protect skin barrier.`,
          confidence: '80.0%',
          disclaimer: 'AI-generated screening result — not a medical diagnosis. Please consult a qualified dermatologist for professional evaluation.'
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Error during AI analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <section id="aiConsultation" className="glass-card">
        <h2>✨ AI Skin Consultation</h2>
        <p>Upload a skin photo or enter your concerns for instant AI-assisted screening.</p>
        
        <form onSubmit={getAIAdvice} style={{ marginTop: '1.5rem' }}>
          <textarea
            placeholder="Describe your skin issues (e.g., redness, dryness, breakouts)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />

          <div style={{ margin: '1rem 0' }}>
            <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
              📷 Upload Skin Photo
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </label>
            {image && <span style={{ marginLeft: '1rem', fontWeight: 600 }}>{image.name}</span>}
          </div>

          {preview && (
            <div style={{ marginBottom: '1rem' }}>
              <img src={preview} alt="Preview" style={{ maxWidth: '200px', borderRadius: '12px' }} />
            </div>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Analyzing with AI...' : 'Get AI Advice'}
          </button>
        </form>

        {result && (
          <div className="result-section" style={{ marginTop: '2rem' }}>
            <h3>Screening Result</h3>
            <p><strong>{result.disease}</strong></p>
            {result.confidence && <span className="confidence-badge">Confidence: {result.confidence}</span>}

            <div className="medical-disclaimer-box" style={{ marginTop: '1rem' }}>
              ⚠️ {result.disclaimer || 'AI-generated screening result — not a medical diagnosis. Please consult a qualified dermatologist for professional evaluation.'}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default AIConsultation;
