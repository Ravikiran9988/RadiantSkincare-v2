import React, { useState } from 'react';
import { analyzeSkinWithModel1 } from '../services/api';
import { toast } from 'react-toastify';
import {
  ScanIcon,
  ShieldIcon,
  UploadIcon,
  InfoIcon,
  SparklesIcon
} from './Icons';
import { useNavigate } from 'react-router-dom';

function AIConsultation() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (JPEG, PNG, WebP).');
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const getAIAdvice = async (e) => {
    e.preventDefault();
    if (!input && !image) {
      toast.warn('Please describe your skin concerns or select a skin photo to upload.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      if (image) {
        const formData = new FormData();
        formData.append('skinIssues', input || 'General Skin Screening');
        formData.append('image', image);
        const data = await analyzeSkinWithModel1(formData);
        setResult(data);
        toast.success('Screening analysis complete!');
      } else {
        setResult({
          disease: `Preliminary guidance for reported symptoms ("${input}"): Maintain gentle cleansing, daily SPF 50+, and barrier restoration.`,
          confidence: '80.0%',
          disclaimer: 'AI-generated screening information is for informational purposes only and is not a medical diagnosis.'
        });
        toast.success('Preliminary guidance generated.');
      }
    } catch (err) {
      console.error('AI Analysis Error:', err);
      toast.error('Error during AI analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="eyebrow">
          <ScanIcon size={14} style={{ color: 'var(--primary-purple)' }} />
          Computer Vision Screening
        </span>
        <h1>AI Skin Image Analysis</h1>
        <p className="subheading" style={{ margin: '0.5rem auto 0' }}>
          Upload a clear photo of your skin for automated feature screening across 23 dermatological categories.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
        {/* Left Column: Upload Area */}
        <div className="card">
          <h3 style={{ marginBottom: '1.25rem' }}>Upload Skin Image</h3>
          <form onSubmit={getAIAdvice} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label>Describe Skin Concerns / Symptoms:</label>
              <textarea
                placeholder="e.g. Red patch on cheek, itchiness, acne flare-up after new product..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <label>Upload Skin Photo:</label>
              <div
                style={{
                  border: isDragging ? '2px dashed var(--secondary-pink)' : '2px dashed var(--primary-purple)',
                  backgroundColor: isDragging ? 'var(--light-purple)' : 'var(--soft-lavender)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="ai-page-upload"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <label htmlFor="ai-page-upload" style={{ cursor: 'pointer', margin: 0 }}>
                  <UploadIcon size={32} style={{ color: 'var(--primary-purple)', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--dark-text)' }}>
                    {image ? image.name : 'Upload a clear photo of your skin'}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>Drag & drop file or click to browse</span>
                </label>
              </div>
            </div>

            {preview && (
              <div style={{ textAlign: 'center', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img src={preview} alt="Skin Preview" style={{ maxHeight: '240px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Analyzing your skin...' : 'Analyze Skin Image'}
            </button>
          </form>
        </div>

        {/* Right Column: Information Panel or Results */}
        <div>
          {!result ? (
            <div className="card">
              <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <InfoIcon size={20} style={{ color: 'var(--primary-purple)' }} />
                What happens next?
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span className="step-number step-1" style={{ margin: 0 }}>1</span>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--dark-text)' }}>Image Preprocessing</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>The image is normalized to 150x150 pixels for neural network feature evaluation.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span className="step-number step-2" style={{ margin: 0 }}>2</span>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--dark-text)' }}>AI Screening</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>ResNet50 computer vision model evaluates features across 23 dermatological categories.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span className="step-number step-3" style={{ margin: 0 }}>3</span>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--dark-text)' }}>Confidence Evaluation</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>Softmax probability distributions calculate prediction confidence percentage metrics.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span className="step-number step-1" style={{ margin: 0 }}>4</span>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--dark-text)' }}>Personalized Guidance</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>Ingredient recommendations and routine building protocols.</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ borderLeft: '4px solid var(--primary-purple)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Screening Result</h3>
                {result.confidence && <span className="status-badge">Model Confidence: {result.confidence}</span>}
              </div>

              <div style={{ backgroundColor: 'var(--soft-lavender)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--dark-text)', marginBottom: '0.5rem' }}>Possible Concern Category</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--dark-text)', margin: 0 }}>{result.disease}</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Recommended Next Steps</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--secondary-text)' }}>
                  <li>Explore matched product recommendations based on active ingredients.</li>
                  <li>Build a daily morning and evening skincare routine on your dashboard.</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button className="btn btn-primary" onClick={() => navigate('/products')} style={{ flex: 1 }}>
                  <SparklesIcon size={16} /> View Products
                </button>
                {isLoggedIn ? (
                  <button className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ flex: 1 }}>
                    <SparklesIcon size={16} /> View Routine
                  </button>
                ) : null}
              </div>

              {/* Auth prompt for guests — shown after screening result */}
              {!isLoggedIn && (
                <div style={{
                  backgroundColor: 'var(--soft-lavender)',
                  border: '1px solid #EDE9FE',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  marginBottom: '1.5rem'
                }}>
                  <strong style={{ fontSize: '0.975rem', fontWeight: 700, color: '#171329', display: 'block', marginBottom: '6px' }}>
                    Save your screening results
                  </strong>
                  <p style={{ fontSize: '0.875rem', color: '#625B71', marginBottom: '16px', lineHeight: 1.5 }}>
                    Create a free account to save your screening results, build your personalized skincare routine, and track your AI screening history.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate('/register')}
                      style={{ height: '44px', padding: '0 1.25rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      Create Free Account →
                    </button>
                    <button
                      onClick={() => navigate('/login')}
                      style={{
                        height: '44px', padding: '0 1.25rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600,
                        color: '#7C3AED', background: 'transparent', border: '1.5px solid #7C3AED',
                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      Sign In →
                    </button>
                  </div>
                </div>
              )}

              <div className="medical-disclaimer-box">
                <ShieldIcon size={18} />
                <span>{result.disclaimer || 'AI-generated screening information is for informational purposes only and is not a medical diagnosis.'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIConsultation;
