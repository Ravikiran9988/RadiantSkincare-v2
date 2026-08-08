import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanIcon, StethoscopeIcon, ShieldIcon, SparklesIcon, CheckIcon } from './Icons';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/ai-consultation');
    } else {
      localStorage.setItem('redirectAfterLogin', '/ai-consultation');
      navigate('/login');
    }
  };

  const handleTalkToDoctor = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/consultation');
    } else {
      localStorage.setItem('redirectAfterLogin', '/consultation');
      navigate('/login');
    }
  };

  return (
    <section className="hero-container" style={{ padding: '3.5rem 0 2rem' }}>
      <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
        {/* Left Column: Headline & Action */}
        <div>
          <span className="eyebrow">
            <SparklesIcon size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-1px' }} />
            AI-Powered Personalized Skincare
          </span>

          <h1 style={{ marginBottom: '1.25rem' }}>
            Smarter skincare.<br />
            Designed around you.
          </h1>

          <p className="subheading" style={{ marginBottom: '2rem' }}>
            Analyze your skin with AI, discover personalized product recommendations, and connect with dermatologists when you need professional guidance.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleStartAnalysis}>
              <ScanIcon size={18} /> Analyze My Skin
            </button>
            <button className="btn btn-secondary" onClick={handleTalkToDoctor}>
              <StethoscopeIcon size={18} /> Talk to a Dermatologist
            </button>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--slate-600)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--primary-teal)' }} /> Computer Vision Analysis
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--primary-teal)' }} /> ML Product Matching
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--primary-teal)' }} /> Real-time Doctor Telehealth
            </span>
          </div>
        </div>

        {/* Right Column: Clean Interactive AI Interface Mockup */}
        <div style={{ position: 'relative' }}>
          <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--slate-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="status-badge">
                  <ScanIcon size={14} /> ResNet50 Vision Engine
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600 }}>Screening Output</span>
            </div>

            {/* Visual Interface Content */}
            <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'var(--slate-100)', marginBottom: '1.25rem', border: '1px solid var(--slate-200)' }}>
              <img
                src="https://images.unsplash.com/photo-1512290900676-26c2a48f9f3d?auto=format&fit=crop&w=800&q=80"
                alt="Skincare Evaluation Preview"
                style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
              />

              {/* Clean Detection Bounding Overlay */}
              <div style={{
                position: 'absolute',
                top: '25%',
                left: '30%',
                width: '40%',
                height: '45%',
                border: '2px dashed var(--primary-teal)',
                borderRadius: '8px',
                backgroundColor: 'rgba(15, 118, 110, 0.08)',
                boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.25)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '8px',
                  background: 'var(--primary-teal)',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  Target Zone • 88.4% Confidence
                </div>
              </div>
            </div>

            {/* Analysis Output Summary Box */}
            <div style={{ background: 'var(--slate-100)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--slate-900)' }}>Screening Classification:</strong>
                <span className="status-badge" style={{ fontSize: '0.75rem' }}>Acne & Rosacea Features</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', margin: 0 }}>
                Matched formulation ingredients: <strong>Salicylic Acid, Niacinamide</strong>. Recommended dermatologist consult for guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
