import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SKIN_TYPES, SKIN_CONCERNS, PRODUCT_TYPES } from '../data/products.js';
import { getRecommendations, getFilteredProducts, getScoreLabel } from '../data/skincareRecommender.js';
import { updateChecklist, fetchDashboardData } from '../services/api';
import {
  SparklesIcon,
  ScanIcon,
  ShieldIcon,
  SearchIcon,
  CheckIcon,
} from '../components/Icons';

// ─── STATIC SKINCARE TIPS ────────────────────────────────────────────────────
const STATIC_TIPS = [
  {
    title: 'Keep Your Routine Consistent',
    tip: 'Give your routine time to work before frequently changing products. Most skincare products take several weeks of consistent use.',
  },
  {
    title: 'Introduce Actives Gradually',
    tip: 'Introduce one new active ingredient at a time so you can better understand how your skin responds to each change.',
  },
  {
    title: "Don't Skip Sunscreen",
    tip: 'Use broad-spectrum sunscreen during daytime as part of your daily skincare routine — regardless of skin type.',
  },
  {
    title: 'Patch Test New Products',
    tip: 'Consider patch testing new products on a small area before applying them more broadly, especially for actives.',
  },
  {
    title: 'Keep It Simple',
    tip: 'A simple routine with compatible products is often easier to maintain and less likely to cause irritation.',
  },
];

// ─── PRODUCT DETAIL MODAL ────────────────────────────────────────────────────
function ProductModal({ product, onClose, onAddToRoutine }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div style={{ marginBottom: '1.25rem', paddingRight: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="status-badge">{product.product_type}</span>
            <span className="routine-pill">{product.routine}</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#171329', marginBottom: '8px', lineHeight: 1.2 }}>
            {product.product_name}
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#625B71', margin: 0, maxWidth: '100%', lineHeight: 1.6 }}>
            {product.description}
          </p>
        </div>

        {/* Best For */}
        <div style={{ background: '#F8F7FF', borderRadius: '12px', padding: '0.875rem 1rem', marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '7px' }}>
            Suitable Skin Types
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {product.skin_types.map((st) => (
              <span key={st} className="ingredient-pill">{st}</span>
            ))}
          </div>
        </div>

        {/* Concerns */}
        <div style={{ background: '#FFF1F7', borderRadius: '12px', padding: '0.875rem 1rem', marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '7px' }}>
            Relevant Concerns
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {product.concerns.map((c) => (
              <span key={c} style={{ padding: '2px 10px', background: '#FCE7F3', border: '1px solid #FBCFE8', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, color: '#EC4899' }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Key Ingredients */}
        <div style={{ marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '7px' }}>
            Key Ingredients to Look For
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {product.key_ingredients.map((ing) => (
              <span key={ing} className="ingredient-pill">{ing}</span>
            ))}
          </div>
        </div>

        {/* Why Recommended */}
        <div style={{ borderLeft: '3px solid #7C3AED', paddingLeft: '1rem', marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Why It May Help</p>
          <p style={{ fontSize: '0.875rem', color: '#625B71', margin: 0, maxWidth: '100%', lineHeight: 1.55 }}>{product.why_recommended}</p>
        </div>

        {/* How to Use */}
        <div style={{ marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>How to Use</p>
          <p style={{ fontSize: '0.875rem', color: '#625B71', margin: 0, maxWidth: '100%', lineHeight: 1.55 }}>{product.how_to_use}</p>
        </div>

        {/* Routine */}
        <div style={{ marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>When to Use</p>
          <span className="routine-pill">{product.routine}</span>
        </div>

        {/* Tip */}
        {product.tips && (
          <div style={{ background: '#F8F7FF', borderRadius: '10px', padding: '0.75rem 0.875rem', marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Usage Note</p>
            <p style={{ fontSize: '0.85rem', color: '#625B71', margin: 0, maxWidth: '100%', lineHeight: 1.5 }}>{product.tips}</p>
          </div>
        )}

        {/* Safety Note */}
        {product.safety_notes && (
          <div className="medical-disclaimer-box" style={{ marginBottom: '0.75rem' }}>
            <ShieldIcon size={15} />
            <span>{product.safety_notes}</span>
          </div>
        )}

        {/* Disclaimer */}
        <div style={{ background: '#FFF1F7', border: '1px solid #FBCFE8', borderRadius: '10px', padding: '0.75rem 0.875rem', marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.78rem', color: '#DB2777', margin: 0, maxWidth: '100%', lineHeight: 1.5 }}>
            Product information is for educational purposes only and does not replace professional medical advice. Consult a healthcare professional for persistent or concerning skin conditions.
          </p>
        </div>

        {/* Action */}
        <button
          className="btn btn-primary"
          style={{ width: '100%', color: '#FFFFFF', height: '48px', fontSize: '0.95rem' }}
          onClick={() => { onAddToRoutine(product.product_name); onClose(); }}
        >
          + Add to Routine
        </button>
      </div>
    </div>
  );
}

// ─── AUTH PROMPT MODAL ────────────────────────────────────────────────────────
function AuthPromptModal({ productName, onClose }) {
  const navigate = useNavigate();
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card" style={{ maxWidth: '400px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>
        <div style={{ textAlign: 'center', padding: '0.5rem 0 1rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <SparklesIcon size={22} style={{ color: '#FFFFFF' }} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#171329', marginBottom: '8px' }}>
            Sign in to save your routine
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#625B71', marginBottom: '1.25rem', maxWidth: '300px', margin: '0 auto 1.25rem', lineHeight: 1.5 }}>
            Create a free account to save <strong style={{ color: '#171329' }}>{productName}</strong> and build your personalised routine.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <button className="btn btn-primary" style={{ width: '100%', color: '#FFFFFF', height: '46px', fontSize: '0.9rem' }} onClick={() => navigate('/register')}>
              Create Free Account →
            </button>
            <button className="btn btn-secondary" style={{ width: '100%', height: '46px', fontSize: '0.9rem' }} onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ item, isRecommendation = false, onViewDetails, onAddToRoutine }) {
  const product = isRecommendation ? item.product : item;
  const scoreLabel = isRecommendation ? item.scoreLabel : null;

  const scoreBadgeClass =
    scoreLabel
      ? scoreLabel.color === '#7C3AED' ? 'score-badge score-badge-purple'
      : scoreLabel.color === '#EC4899' ? 'score-badge score-badge-pink'
      : 'score-badge score-badge-muted'
      : '';

  return (
    <div className="product-card animate-in" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Type + Score row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '6px' }}>
        <span className="status-badge" style={{ fontSize: '0.72rem' }}>{product.product_type}</span>
        {scoreLabel && <span className={scoreBadgeClass} style={{ fontSize: '0.72rem', flexShrink: 0 }}>✦ {scoreLabel.label}</span>}
      </div>

      {/* Name */}
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#171329', marginBottom: '6px', lineHeight: 1.25 }}>
        {product.product_name}
      </h3>

      {/* Description */}
      <p style={{ fontSize: '0.845rem', color: '#625B71', marginBottom: '10px', lineHeight: 1.5, maxWidth: '100%', flexGrow: 0 }}>
        {product.description.length > 110 ? product.description.slice(0, 110) + '…' : product.description}
      </p>

      {/* Suitable For */}
      <div style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '5px' }}>Suitable For</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {product.skin_types.map((st) => (
            <span key={st} style={{ fontSize: '0.73rem', fontWeight: 600, color: '#625B71', background: '#F5F3FF', border: '1px solid #EDE9FE', borderRadius: '9999px', padding: '2px 7px' }}>{st}</span>
          ))}
        </div>
      </div>

      {/* Key Ingredients */}
      <div style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '5px' }}>Key Ingredients</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {product.key_ingredients.slice(0, 3).map((ing) => (
            <span key={ing} className="ingredient-pill" style={{ fontSize: '0.73rem' }}>{ing}</span>
          ))}
          {product.key_ingredients.length > 3 && (
            <span className="ingredient-pill" style={{ fontSize: '0.73rem' }}>+{product.key_ingredients.length - 3}</span>
          )}
        </div>
      </div>

      {/* Why relevant (recommendation only) */}
      {isRecommendation && (
        <div style={{ background: '#F8F7FF', borderRadius: '8px', padding: '0.5rem 0.7rem', marginBottom: '8px' }}>
          <p style={{ fontSize: '0.8rem', color: '#625B71', margin: 0, maxWidth: '100%', lineHeight: 1.45 }}>
            {product.why_recommended.length > 100 ? product.why_recommended.slice(0, 100) + '…' : product.why_recommended}
          </p>
        </div>
      )}

      {/* Routine */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span className="routine-pill">{product.routine}</span>
        <span style={{ fontSize: '0.75rem', color: '#8A8398', lineHeight: 1.3 }}>
          {product.how_to_use.length > 52 ? product.how_to_use.slice(0, 52) + '…' : product.how_to_use}
        </span>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F5F3FF', paddingTop: '14px' }}>
        <button
          id={`view-details-${product.product_id}`}
          onClick={() => onViewDetails(product)}
          style={{ flex: 1, height: '40px', borderRadius: '10px', border: '1.5px solid #7C3AED', background: 'transparent', color: '#7C3AED', fontWeight: 600, fontSize: '0.835rem', cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F5F3FF'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          View Details
        </button>
        <button
          id={`add-routine-${product.product_id}`}
          onClick={() => onAddToRoutine(product.product_name)}
          style={{ flex: 1, height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', color: '#FFFFFF', fontWeight: 600, fontSize: '0.835rem', border: 'none', cursor: 'pointer', transition: 'opacity 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          + Add to Routine
        </button>
      </div>
    </div>
  );
}

// ─── CATEGORY BROWSE ICONS ────────────────────────────────────────────────────
const CATEGORY_META = {
  'Cleanser':   { icon: '🧴', desc: 'Daily cleansing formulations' },
  'Serum':      { icon: '💧', desc: 'Targeted active serums' },
  'Essence':    { icon: '✨', desc: 'Lightweight hydrating essences' },
  'Moisturizer':{ icon: '🌿', desc: 'Hydration and barrier support' },
  'Sunscreen':  { icon: '☀️', desc: 'Daily UV protection' },
  'Treatment':  { icon: '⚗️', desc: 'Targeted active treatments' },
  'Body Care':  { icon: '🛁', desc: 'Supportive body skin formulations' },
};

// ─── MAIN PRODUCTS PAGE ────────────────────────────────────────────────────────
function Products() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Filter state
  const [selectedConcern, setSelectedConcern]         = useState('');
  const [selectedSkinType, setSelectedSkinType]       = useState('');
  const [selectedProductType, setSelectedProductType] = useState('Any Product');
  const [searchQuery, setSearchQuery]                 = useState('');

  // Results
  const [recommendations, setRecommendations] = useState(null);
  const [hasSearched, setHasSearched]         = useState(false);

  // Modal state
  const [detailProduct, setDetailProduct]     = useState(null);
  const [authPromptProduct, setAuthPromptProduct] = useState(null);

  // Catalog filter state (browse section)
  const [browseType, setBrowseType] = useState('Any Product');

  const handleShowRecommendations = () => {
    const effectiveConcern  = selectedConcern  === 'Not Sure' ? '' : selectedConcern;
    const effectiveSkinType = selectedSkinType === 'Not Sure' ? '' : selectedSkinType;

    if (!effectiveConcern && !effectiveSkinType) {
      toast.warn('Please select at least a skin concern or skin type to see recommendations.');
      return;
    }
    const results = getRecommendations(effectiveConcern, effectiveSkinType, selectedProductType);
    setRecommendations(results);
    setHasSearched(true);
    setTimeout(() => {
      document.getElementById('recommendation-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleReset = () => {
    setSelectedConcern('');
    setSelectedSkinType('');
    setSelectedProductType('Any Product');
    setRecommendations(null);
    setHasSearched(false);
  };

  const handleAddToRoutine = useCallback(async (productName) => {
    if (!isLoggedIn) {
      setAuthPromptProduct(productName);
      return;
    }
    try {
      let routineChecklist = [];
      try {
        const res = await fetchDashboardData();
        routineChecklist = res.data?.routineChecklist || [];
      } catch {
        routineChecklist = [];
      }
      const newStep = { step: `Custom: ${productName}`, done: false };
      await updateChecklist([...routineChecklist, newStep]);
      toast.success(`"${productName}" added to your routine!`);
    } catch {
      toast.info(`"${productName}" noted for your routine.`);
    }
  }, [isLoggedIn]);

  // Browse catalog products
  const browseCatalog = getFilteredProducts(browseType, searchQuery);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh' }}>

      {/* ── MODALS ──────────────────────────────────────────────── */}
      {detailProduct && (
        <ProductModal product={detailProduct} onClose={() => setDetailProduct(null)} onAddToRoutine={handleAddToRoutine} />
      )}
      {authPromptProduct && (
        <AuthPromptModal productName={authPromptProduct} onClose={() => setAuthPromptProduct(null)} />
      )}

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F8F7FF', borderBottom: '1px solid #EDE9FE', padding: '48px 0 44px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ maxWidth: '600px' }}>
            <span className="eyebrow" style={{ marginBottom: '18px' }}>
              <SparklesIcon size={13} style={{ color: '#7C3AED' }} />
              PERSONALIZED SKINCARE
            </span>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#171329', marginBottom: '14px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Personalized Skincare<br />
              <span style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Recommendations
              </span>
            </h1>
            <p style={{ fontSize: '1rem', color: '#625B71', lineHeight: 1.6, marginBottom: '24px', maxWidth: '500px' }}>
              Find skincare products and routine guidance based on your skin type, concerns, and skincare goals.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                id="hero-analyze-btn"
                className="btn btn-primary"
                style={{ height: '48px', padding: '0 1.4rem', fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                onClick={() => navigate('/ai-consultation')}
              >
                <ScanIcon size={16} /> Analyze My Skin
              </button>
              <button
                id="hero-browse-btn"
                style={{ height: '48px', padding: '0 1.4rem', borderRadius: '14px', fontSize: '0.95rem', fontWeight: 600, color: '#7C3AED', background: 'transparent', border: '1.5px solid #7C3AED', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', transition: 'background 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                onClick={() => document.getElementById('finder-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse All Products ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PRODUCT FINDER ───────────────────────────────────── */}
      <section id="finder-section" style={{ padding: '44px 0 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#171329', marginBottom: '6px' }}>Find Products For You</h2>
            <p style={{ fontSize: '0.925rem', color: '#625B71', margin: 0, maxWidth: '460px' }}>
              Tell us what you're looking for and we'll show relevant skincare options.
            </p>
          </div>

          {/* Filter card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EDE9FE', borderRadius: '18px', padding: '22px 24px', marginBottom: '28px', boxShadow: '0 2px 10px rgba(124,58,237,0.04)' }}>
            <div className="filter-bar">

              {/* Field 1: Skin Concern */}
              <div>
                <label htmlFor="select-concern" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#171329', marginBottom: '7px' }}>Skin Concern</label>
                <select
                  id="select-concern"
                  value={selectedConcern}
                  onChange={e => setSelectedConcern(e.target.value)}
                  style={{ height: '46px', borderRadius: '11px', border: '1px solid #E5E0EF', color: selectedConcern ? '#171329' : '#8A8398', fontSize: '0.875rem' }}
                >
                  <option value="">Select Skin Concern</option>
                  {SKIN_CONCERNS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Field 2: Skin Type */}
              <div>
                <label htmlFor="select-skin-type" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#171329', marginBottom: '7px' }}>Skin Type</label>
                <select
                  id="select-skin-type"
                  value={selectedSkinType}
                  onChange={e => setSelectedSkinType(e.target.value)}
                  style={{ height: '46px', borderRadius: '11px', border: '1px solid #E5E0EF', color: selectedSkinType ? '#171329' : '#8A8398', fontSize: '0.875rem' }}
                >
                  <option value="">Select Skin Type</option>
                  {SKIN_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Field 3: What are you looking for? */}
              <div>
                <label htmlFor="select-product-type" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#171329', marginBottom: '7px' }}>What are you looking for?</label>
                <select
                  id="select-product-type"
                  value={selectedProductType}
                  onChange={e => setSelectedProductType(e.target.value)}
                  style={{ height: '46px', borderRadius: '11px', border: '1px solid #E5E0EF', color: '#171329', fontSize: '0.875rem' }}
                >
                  {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Show button */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <button
                  id="show-recommendations-btn"
                  onClick={handleShowRecommendations}
                  className="btn btn-primary"
                  style={{ height: '46px', padding: '0 1.4rem', fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap' }}
                >
                  Show Recommendations
                </button>
              </div>
            </div>

            {/* Reset link */}
            {hasSearched && (
              <div style={{ marginTop: '10px' }}>
                <button onClick={handleReset} style={{ background: 'none', border: 'none', color: '#8A8398', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Not-sure-about-skin banner */}
          {!hasSearched && (
            <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.055), rgba(236,72,153,0.035))', border: '1px solid #EDE9FE', borderRadius: '14px', padding: '14px 18px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#171329', display: 'block', marginBottom: '2px' }}>Not sure about your skin type?</strong>
                <span style={{ fontSize: '0.835rem', color: '#625B71' }}>Radiant's AI Skin Analysis can help you understand your skin profile.</span>
              </div>
              <button
                id="banner-analyze-btn"
                className="btn btn-primary"
                style={{ height: '40px', padding: '0 1.1rem', fontSize: '0.845rem', fontWeight: 700, color: '#FFFFFF', flexShrink: 0 }}
                onClick={() => navigate('/ai-consultation')}
              >
                <ScanIcon size={14} /> Analyze My Skin →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. RECOMMENDATION RESULTS ──────────────────────────── */}
      {hasSearched && (
        <section id="recommendation-results" style={{ padding: '0 0 44px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#171329' }}>Recommended For You</h2>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {selectedSkinType && selectedSkinType !== 'Not Sure' && <span className="status-badge">{selectedSkinType} Skin</span>}
                  {selectedConcern && selectedConcern !== 'Not Sure' && <span className="status-badge pink">{selectedConcern}</span>}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#625B71', margin: 0 }}>
                {recommendations && recommendations.length > 0
                  ? `${recommendations.length} relevant skincare option${recommendations.length !== 1 ? 's' : ''} selected based on your skin preferences and skincare goals.`
                  : 'No close matches found. Try adjusting your selections below.'}
              </p>
            </div>

            {/* No results */}
            {recommendations && recommendations.length === 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #EDE9FE', borderRadius: '18px', padding: '2.25rem', textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '2.25rem', marginBottom: '10px' }}>🔍</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#171329', marginBottom: '6px' }}>No exact matches found</h3>
                <p style={{ fontSize: '0.875rem', color: '#625B71', marginBottom: '18px', maxWidth: '320px', margin: '0 auto 18px' }}>
                  Try another skin type, concern, or product category.
                </p>
                <button onClick={handleReset} className="btn btn-secondary" style={{ height: '40px', fontSize: '0.85rem', padding: '0 1.25rem' }}>Reset Filters</button>
              </div>
            )}

            {/* Product grid */}
            {recommendations && recommendations.length > 0 && (
              <div className="grid-3" style={{ marginBottom: '36px' }}>
                {recommendations.map((item) => (
                  <ProductCard key={item.product.product_id} item={item} isRecommendation={true} onViewDetails={setDetailProduct} onAddToRoutine={handleAddToRoutine} />
                ))}
              </div>
            )}

            {/* ── SKINCARE TIPS ──────────────────────────────────── */}
            <div style={{ background: '#F8F7FF', border: '1px solid #EDE9FE', borderRadius: '18px', padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '16px' }}>
                <CheckIcon size={17} style={{ color: '#7C3AED' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171329', margin: 0 }}>Simple Skincare Tips</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {STATIC_TIPS.map((item, i) => (
                  <div key={i} className="tip-card">
                    <span className="tip-number">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <strong style={{ fontSize: '0.875rem', color: '#171329', display: 'block', marginBottom: '2px' }}>{item.title}</strong>
                      <span style={{ fontSize: '0.835rem', color: '#625B71', lineHeight: 1.5 }}>{item.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '14px', padding: '10px 14px', background: '#FFF1F7', border: '1px solid #FCE7F3', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.775rem', color: '#DB2777', margin: 0, maxWidth: '100%' }}>
                  These tips are for general skincare education only. Consult a healthcare professional for persistent or medical skin concerns.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. EXPLORE ALL PRODUCTS ─────────────────────────────── */}
      <section style={{ padding: '44px 0', borderTop: '1px solid #EDE9FE' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Section header + search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#171329', marginBottom: '4px' }}>
                {hasSearched ? 'Explore More Skincare Options' : 'Explore Our Skincare Options'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#625B71', margin: 0 }}>
                {browseCatalog.length} formulation{browseCatalog.length !== 1 ? 's' : ''} available
              </p>
            </div>
            <div style={{ position: 'relative', width: '240px' }}>
              <SearchIcon size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#8A8398', pointerEvents: 'none' }} />
              <input
                id="catalog-search"
                type="text"
                placeholder="Search skincare options..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.25rem', height: '40px', borderRadius: '11px', border: '1px solid #E5E0EF', fontSize: '0.85rem', width: '100%' }}
              />
            </div>
          </div>

          {/* Category cards (shown when no active search/filter) */}
          {!searchQuery && browseType === 'Any Product' && !hasSearched && (
            <div className="grid-4" style={{ marginBottom: '24px' }}>
              {Object.entries(CATEGORY_META).map(([cat, meta]) => (
                <button
                  key={cat}
                  className="category-card"
                  style={{ background: 'none', border: '1px solid #EDE9FE', width: '100%', textAlign: 'left' }}
                  onClick={() => setBrowseType(cat)}
                >
                  <span style={{ fontSize: '1.6rem', marginBottom: '3px' }}>{meta.icon}</span>
                  <strong style={{ fontSize: '0.9rem', fontWeight: 700, color: '#171329', display: 'block' }}>{cat}s</strong>
                  <span style={{ fontSize: '0.775rem', color: '#625B71', lineHeight: 1.4 }}>{meta.desc}</span>
                </button>
              ))}
            </div>
          )}

          {/* Product type filter tabs */}
          <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {PRODUCT_TYPES.filter(t => t !== 'Complete Routine').map(t => (
              <button
                key={t}
                onClick={() => setBrowseType(t)}
                style={{ height: '34px', padding: '0 13px', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 600, border: browseType === t ? '1.5px solid #7C3AED' : '1.5px solid #EDE9FE', background: browseType === t ? '#7C3AED' : '#FFFFFF', color: browseType === t ? '#FFFFFF' : '#625B71', cursor: 'pointer', transition: 'all 0.15s' }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Product grid */}
          {browseCatalog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', background: '#FFFFFF', border: '1px solid #EDE9FE', borderRadius: '18px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#171329', marginBottom: '5px' }}>No results found</h3>
              <p style={{ fontSize: '0.85rem', color: '#625B71', margin: 0 }}>Try a different search term or product type.</p>
            </div>
          ) : (
            <div className="grid-3">
              {browseCatalog.map(product => (
                <ProductCard key={product.product_id} item={product} isRecommendation={false} onViewDetails={setDetailProduct} onAddToRoutine={handleAddToRoutine} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 5. AI CTA ───────────────────────────────────────────── */}
      <section style={{ padding: '44px 0', background: '#F8F7FF', borderTop: '1px solid #EDE9FE' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #1E1633 0%, #291B42 100%)', borderRadius: '20px', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#EC4899', display: 'block', marginBottom: '8px' }}>AI Skin Analysis</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.2 }}>Not sure what your skin needs?</h2>
              <p style={{ fontSize: '0.9rem', color: '#C4B5FD', margin: 0, maxWidth: '420px' }}>
                Radiant's AI Skin Analysis can help you understand your skin and explore relevant skincare options.
              </p>
            </div>
            <button
              id="cta-analyze-btn"
              className="btn btn-primary"
              style={{ height: '48px', padding: '0 1.5rem', fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => navigate('/ai-consultation')}
            >
              <ScanIcon size={17} /> Analyze My Skin →
            </button>
          </div>

          <div className="medical-disclaimer-box" style={{ marginTop: '16px' }}>
            <ShieldIcon size={15} />
            <span>
              Skincare information on this page is for general educational purposes only and does not constitute medical advice, diagnosis, or treatment. For persistent, severe, or concerning skin conditions, consult a qualified healthcare professional.
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Products;