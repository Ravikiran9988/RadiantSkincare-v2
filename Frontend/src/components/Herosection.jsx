import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanIcon, SparklesIcon, CheckIcon, SearchIcon } from './Icons';

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

  const handleExploreProducts = () => {
    navigate('/products');
  };

  return (
    <section className="hero-container" style={{ padding: '2.25rem 0 1rem' }}>
      <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
        {/* Left Column: Headline & Action CTAs */}
        <div>
          <span className="eyebrow">
            <SparklesIcon size={14} style={{ color: 'var(--primary-purple)' }} />
            AI-POWERED PERSONALIZED SKINCARE
          </span>

          <h1 style={{ marginBottom: '1rem', color: 'var(--dark-text)' }}>
            Smarter skincare.<br />
            <span style={{
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Designed around you.
            </span>
          </h1>

          <p className="subheading" style={{ marginBottom: '1.75rem', maxWidth: '540px' }}>
            Analyze your skin with AI, discover personalized product recommendations, and build a routine designed around your skin type and concerns.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleStartAnalysis}>
              <ScanIcon size={18} /> Analyze My Skin
            </button>
            <button className="btn btn-secondary" onClick={handleExploreProducts}>
              <SearchIcon size={18} style={{ color: 'var(--primary-purple)' }} /> Explore Products
            </button>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--primary-purple)' }} /> Computer Vision Screening
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--secondary-pink)' }} /> Routine Builder & Insights
            </span>
          </div>
        </div>

        {/* Right Column: Refined Skincare Facial AI Visualizer */}
        <div style={{ position: 'relative' }}>
          <div className="card" style={{ padding: '1.35rem', background: '#ffffff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-elevated)' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--dark-text)' }}>AI Skin Analysis Preview</h3>
              <span className="status-badge">
                <ScanIcon size={13} /> ResNet50 Vision Engine
              </span>
            </div>

            {/* Facial Scanning Overlay */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #1E1633 0%, #291B42 100%)',
              height: '230px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              border: '1px solid rgba(124, 58, 237, 0.25)'
            }}>
              <svg width="180" height="180" viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', opacity: 0.25 }}>
                <path d="M100 20 C60 20 40 50 40 90 C40 140 70 180 100 180 C130 180 160 140 160 90 C160 50 140 20 100 20 Z" stroke="#EC4899" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="75" cy="80" r="12" stroke="#7C3AED" strokeWidth="1.5" />
                <circle cx="125" cy="80" r="12" stroke="#7C3AED" strokeWidth="1.5" />
                <path d="M90 115 Q100 120 110 115" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M80 145 Q100 155 120 145" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              <div style={{
                position: 'relative',
                width: '100px',
                height: '100px',
                border: '2px solid #7C3AED',
                borderRadius: '14px',
                backgroundColor: 'rgba(124, 58, 237, 0.12)',
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EC4899', boxShadow: '0 0 8px #EC4899' }} />
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

              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'rgba(30, 22, 51, 0.85)',
                color: '#C4B5FD',
                fontSize: '0.68rem',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                Example AI Screening
              </div>
            </div>

            <div style={{ background: 'var(--soft-lavender)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--dark-text)' }}>Classification:</strong>
                <span className="status-badge pink" style={{ fontSize: '0.725rem' }}>Acne & Rosacea Features</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--secondary-text)', margin: 0 }}>
                Matched formulation ingredients: <strong>Salicylic Acid, Niacinamide</strong>. Build your routine to track progress.
              </p>
            </div>

            <div style={{ fontSize: '0.725rem', color: 'var(--muted-text)', textAlign: 'center', marginTop: '0.65rem' }}>
              AI-generated screening information. Not a medical diagnosis.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
