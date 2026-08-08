import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanIcon, StethoscopeIcon, SparklesIcon, CheckIcon, ShieldIcon } from './Icons';

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
    <section className="hero-container" style={{ padding: '3rem 0 1.5rem' }}>
      <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
        {/* Left Column: Headline & Primary CTAs */}
        <div>
          <span className="eyebrow">
            <SparklesIcon size={14} style={{ color: 'var(--primary-purple)' }} />
            AI-Powered Personalized Skincare
          </span>

          <h1 style={{ marginBottom: '1.25rem' }}>
            Smarter skincare.<br />
            <span style={{
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Designed around you.
            </span>
          </h1>

          <p className="subheading" style={{ marginBottom: '2rem', maxWidth: '560px' }}>
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

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--primary-purple)' }} /> Computer Vision Analysis
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--secondary-pink)' }} /> ML Product Matching
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--primary-purple)' }} /> Real-time Doctor Telehealth
            </span>
          </div>
        </div>

        {/* Right Column: 100% Reliable Pure CSS/SVG AI Analysis Visualizer (Zero Broken Images) */}
        <div style={{ position: 'relative' }}>
          <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-elevated)' }}>
            {/* Visualizer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.05rem', margin: 0 }}>AI Skin Screening</h3>
              <span className="status-badge">
                <ScanIcon size={14} /> ResNet50 Vision Engine
              </span>
            </div>

            {/* Pure CSS/SVG Skin Scanning Interface */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #1E1633 0%, #2D1F47 100%)',
              height: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              border: '1px solid rgba(124, 58, 237, 0.2)'
            }}>
              {/* Background Medical Mesh Pattern */}
              <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15 }}>
                <defs>
                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#EC4899" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Central Target Face Frame Overlay */}
              <div style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: '2px dashed #EC4899',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)'
              }}>
                {/* Active Target Reticle Box */}
                <div style={{
                  width: '90px',
                  height: '90px',
                  border: '2px solid #7C3AED',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(124, 58, 237, 0.15)',
                  boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap'
                  }}>
                    Feature Detection • 88.4%
                  </div>
                </div>
              </div>

              {/* Sample Analysis Label Watermark */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '12px',
                background: 'rgba(30, 22, 51, 0.85)',
                color: '#C4B5FD',
                fontSize: '0.7rem',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                Example AI Screening
              </div>
            </div>

            {/* Analysis Output Summary Box */}
            <div style={{ background: 'var(--soft-lavender)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--dark-text)' }}>Screening Classification:</strong>
                <span className="status-badge pink" style={{ fontSize: '0.75rem' }}>Acne & Rosacea Features</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--secondary-text)', margin: 0 }}>
                Matched formulation ingredients: <strong>Salicylic Acid, Niacinamide</strong>. Recommended dermatologist consult for evaluation.
              </p>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', textAlign: 'center', marginTop: '0.75rem' }}>
              AI-generated screening information. Not a medical diagnosis.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
