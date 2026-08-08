import React, { useState } from 'react';
import { analyzeSkin } from '../services/api';
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
  const [analysisType, setAnalysisType] = useState('Complete Skin Analysis');
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
    if (!image) {
      toast.warn('Please select a skin photo to upload for analysis.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('analysisType', analysisType);
      formData.append('image', image);
      
      const res = await analyzeSkin(formData);
      if (res.success && res.data) {
        setResult(res.data);
        toast.success('Screening analysis complete!');
      } else {
        throw new Error(res.message || 'Analysis failed');
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
          Upload a clear photo of your skin for automated feature screening and analysis.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
        {/* Left Column: Upload Area */}
        <div className="card">
          <h3 style={{ marginBottom: '1.25rem' }}>Upload Skin Image</h3>
          <form onSubmit={getAIAdvice} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label>Select Analysis Type:</label>
              <select 
                value={analysisType} 
                onChange={(e) => setAnalysisType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--dark-text)',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23171329%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px top 50%',
                  backgroundSize: '12px auto'
                }}
              >
                <option value="Complete Skin Analysis">Complete Skin Analysis</option>
                <option value="Skin Type">Skin Type Only</option>
                <option value="Skin Concerns">Skin Concerns Only</option>
                <option value="Skin Health">Skin Health Signals Only</option>
              </select>
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
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>The image is prepared and securely forwarded to our AI models.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span className="step-number step-2" style={{ margin: 0 }}>2</span>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--dark-text)' }}>AI Screening</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>Specialized vision models evaluate features associated with skin type, concerns, and health signals.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span className="step-number step-3" style={{ margin: 0 }}>3</span>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--dark-text)' }}>Confidence Evaluation</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>Models calculate prediction confidence metrics to generate your structured profile.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span className="step-number step-1" style={{ margin: 0 }}>4</span>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--dark-text)' }}>Personalized Guidance</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>Take your results to our product catalog for personalized recommendations.</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ borderLeft: '4px solid var(--primary-purple)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>AI Skin Profile</h3>
              </div>

              {result.warnings && result.warnings.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  {result.warnings.map((warn, i) => (
                    <p key={i} style={{ fontSize: '0.85rem', color: '#DB2777', margin: 0 }}>* {warn}</p>
                  ))}
                </div>
              )}

              {result.skinType && (
                <div style={{ backgroundColor: 'var(--soft-lavender)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ color: 'var(--dark-text)', margin: 0 }}>Skin Type</h4>
                    <span className="status-badge">Model Confidence: {Math.round(result.skinTypeConfidence * 100)}%</span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--dark-text)', margin: 0 }}>{result.skinType}</p>
                </div>
              )}

              {result.screeningConcerns && result.screeningConcerns.length > 0 && (
                <div style={{ backgroundColor: 'var(--soft-lavender)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--dark-text)', marginBottom: '0.5rem' }}>AI-Assisted Screening</h4>
                  {result.screeningConcerns.map((concern, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <p style={{ fontSize: '0.95rem', color: 'var(--dark-text)', margin: 0 }}>{concern.label}</p>
                      <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>{Math.round(concern.confidence * 100)}%</span>
                    </div>
                  ))}
                </div>
              )}

              {result.skinSignals && (
                <div style={{ backgroundColor: 'var(--soft-lavender)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--dark-text)', marginBottom: '0.5rem' }}>Skin Health Signals</h4>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', margin: 0 }}>Hydration Signal</p>
                      <strong style={{ color: 'var(--dark-text)' }}>{result.skinSignals.hydration}</strong>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', margin: 0 }}>Texture / Structure Signal</p>
                      <strong style={{ color: 'var(--dark-text)' }}>{result.skinSignals.structure}</strong>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', margin: 0 }}>Sun-Damage Signal</p>
                      <strong style={{ color: 'var(--dark-text)' }}>{result.skinSignals.sunDamage}</strong>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', margin: 0 }}>Elasticity Signal</p>
                      <strong style={{ color: 'var(--dark-text)' }}>{result.skinSignals.elasticity}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Personalized Recommendations</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--secondary-text)' }}>
                  <li>Use your AI Skin Profile to find products tailored to your needs.</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/products', { state: { skinType: result.skinType, concern: result.screeningConcerns?.[0]?.label } })} 
                  style={{ flex: 1 }}
                >
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
                <span>AI-generated screening information is for informational purposes only and is not a medical diagnosis. For persistent, severe, or concerning skin issues, consult a qualified healthcare professional.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIConsultation;
