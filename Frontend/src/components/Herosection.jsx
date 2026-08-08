import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanIcon, SparklesIcon, CheckIcon, SearchIcon } from './Icons';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    navigate('/ai-consultation');
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
            <button className="btn btn-secondary explore-products-btn" onClick={handleExploreProducts}>
              <SearchIcon size={18} /> Explore Products
            </button>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--secondary-text)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--primary-purple)' }} /> Computer Vision Screening
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckIcon size={16} style={{ color: 'var(--secondary-pink)' }} /> Personalized Routine & Insights
            </span>
          </div>
        </div>

        {/* Right Column: Abstract Computer Vision AI Visualizer (Zero Facial Features) */}
        <div style={{ position: 'relative' }}>
          <div className="card" style={{ padding: '1.35rem', background: '#ffffff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-elevated)' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--dark-text)' }}>AI Skin Screening</h3>
              <span className="status-badge">
                <ScanIcon size={13} /> Computer Vision Engine
              </span>
            </div>

            {/* Abstract Skin Analysis Computer Vision Frame */}
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
              {/* Abstract Skin Contour & Target Grid Lines (Zero eyes/nose/mouth) */}
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', opacity: 0.35 }}>
                {/* Abstract Oval Contour */}
                <ellipse cx="100" cy="100" rx="65" ry="80" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="4 4" />
                {/* Grid Nodes */}
                <circle cx="60" cy="70" r="3" fill="#EC4899" />
                <circle cx="140" cy="70" r="3" fill="#EC4899" />
                <circle cx="100" cy="50" r="3" fill="#7C3AED" />
                <circle cx="100" cy="150" r="3" fill="#7C3AED" />
                <circle cx="65" cy="130" r="3" fill="#EC4899" />
                <circle cx="135" cy="130" r="3" fill="#EC4899" />
                {/* Intersecting Radar Lines */}
                <line x1="35" y1="100" x2="165" y2="100" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
              </svg>

              {/* Active Target Reticle Box */}
              <div style={{
                position: 'relative',
                width: '110px',
                height: '110px',
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
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 9px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap'
                }}>
                  Model Confidence • 88.4%
                </div>
              </div>

              {/* Sample Analysis Watermark */}
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

            {/* Analysis Output Summary Box */}
            <div style={{ background: 'var(--soft-lavender)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--dark-text)' }}>Screening Classification:</strong>
                <span className="status-badge pink" style={{ fontSize: '0.725rem' }}>Acne & Rosacea Features</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--secondary-text)', margin: 0 }}>
                Matched ingredients: <strong>Salicylic Acid, Niacinamide</strong>. Explore personalized skincare recommendations.
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
