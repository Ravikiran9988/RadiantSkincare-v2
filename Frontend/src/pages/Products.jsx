import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SKIN_TYPES, SKIN_CONCERNS, PRODUCT_TYPES } from '../data/products.js';
import { getRecommendations, getFilteredProducts, getScoreLabel } from '../data/skincareRecommender.js';
import { getSkincareTips } from '../data/skincareTips.js';
import { updateChecklist, fetchDashboardData } from '../services/api';
import {
  SparklesIcon,
  ScanIcon,
  ShieldIcon,
  SearchIcon,
  ArrowRightIcon,
  CheckIcon,
  InfoIcon,
} from '../components/Icons';

// ─── PRODUCT DETAIL MODAL ───────────────────────────────────────────────────
function ProductModal({ product, onClose, onAddToRoutine }) {
  if (!product) return null;
  const scoreInfo = getScoreLabel ? null : null;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="status-badge">{product.product_type}</span>
            <span className="routine-pill">{product.routine}</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#171329', marginBottom: '6px', lineHeight: 1.2 }}>
            {product.product_name}
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#625B71', margin: 0, maxWidth: '100%' }}>
            {product.description}
          </p>
        </div>

        {/* Best For */}
        <div style={{ background: '#F8F7FF', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Suitable Skin Types
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {product.skin_types.map((st) => (
              <span key={st} className="ingredient-pill">{st}</span>
            ))}
          </div>
        </div>

        {/* Concerns */}
        <div style={{ background: '#FFF1F7', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#EC4899', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Relevant Concerns
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {product.concerns.map((c) => (
              <span key={c} style={{ padding: '0.2rem 0.65rem', background: '#FCE7F3', border: '1px solid #FBCFE8', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, color: '#EC4899' }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Key Ingredients */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Key Ingredients to Look For
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {product.key_ingredients.map((ing) => (
              <span key={ing} className="ingredient-pill">{ing}</span>
            ))}
          </div>
        </div>

        {/* Why Recommended */}
        <div style={{ borderLeft: '3px solid #7C3AED', paddingLeft: '1rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Why It May Be Relevant</p>
          <p style={{ fontSize: '0.9rem', color: '#625B71', margin: 0, maxWidth: '100%' }}>{product.why_recommended}</p>
        </div>

        {/* How to Use */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>How to Use</p>
          <p style={{ fontSize: '0.9rem', color: '#625B71', margin: 0, maxWidth: '100%' }}>{product.how_to_use}</p>
        </div>

        {/* Routine */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Routine</p>
          <span className="routine-pill">{product.routine}</span>
        </div>

        {/* Tips */}
        {product.tips && (
          <div style={{ background: '#F8F7FF', borderRadius: '12px', padding: '0.85rem 1rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Skincare Tip</p>
            <p style={{ fontSize: '0.875rem', color: '#625B71', margin: 0, maxWidth: '100%' }}>{product.tips}</p>
          </div>
        )}

        {/* Safety Notes */}
        {product.safety_notes && (
          <div className="medical-disclaimer-box" style={{ marginBottom: '1.25rem' }}>
            <ShieldIcon size={16} />
            <span>{product.safety_notes}</span>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div style={{ background: '#FFF1F7', border: '1px solid #FBCFE8', borderRadius: '12px', padding: '0.85rem 1rem', marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#DB2777', margin: 0, maxWidth: '100%', lineHeight: 1.5 }}>
            <strong>Medical Disclaimer:</strong> Information provided is for general skincare education only and is not a substitute for medical diagnosis, advice, or treatment. Consult a qualified healthcare professional for persistent, severe, or concerning skin conditions.
          </p>
        </div>

        {/* Actions */}
        <button
          className="btn btn-primary"
          style={{ width: '100%', color: '#FFFFFF' }}
          onClick={() => { onAddToRoutine(product.product_name); onClose(); }}
        >
          + Add to Routine
        </button>
      </div>
    </div>
  );
}

// ─── AUTH PROMPT MODAL ───────────────────────────────────────────────────────
function AuthPromptModal({ productName, onClose }) {
  const navigate = useNavigate();
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card" style={{ maxWidth: '420px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>
        <div style={{ textAlign: 'center', padding: '0.5rem 0 1.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <SparklesIcon size={24} style={{ color: '#FFFFFF' }} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#171329', marginBottom: '8px' }}>
            Save to your routine
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#625B71', marginBottom: '1.5rem', maxWidth: '320px', margin: '0 auto 1.5rem' }}>
            Create a free account to save <strong>{productName}</strong> and build your personalised skincare routine.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              className="btn btn-primary"
              style={{ width: '100%', color: '#FFFFFF' }}
              onClick={() => navigate('/register')}
            >
              Create Free Account →
            </button>
            <button
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────
function ProductCard({ item, isRecommendation = false, onViewDetails, onAddToRoutine }) {
  const product = isRecommendation ? item.product : item;
  const scoreLabel = isRecommendation ? item.scoreLabel : null;

  const scoreBadgeClass = scoreLabel
    ? (scoreLabel.color === '#7C3AED' ? 'score-badge score-badge-purple'
      : scoreLabel.color === '#EC4899' ? 'score-badge score-badge-pink'
      : 'score-badge score-badge-muted')
    : '';

  return (
    <div className="product-card animate-in">
      {/* Top Row: Type + Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
        <span className="status-badge">{product.product_type}</span>
        {scoreLabel && <span className={scoreBadgeClass}>✦ {scoreLabel.label}</span>}
      </div>

      {/* Name */}
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#171329', marginBottom: '8px', lineHeight: 1.25 }}>
        {product.product_name}
      </h3>

      {/* Short Description */}
      <p style={{ fontSize: '0.875rem', color: '#625B71', marginBottom: '12px', lineHeight: 1.5, maxWidth: '100%' }}>
        {product.description.length > 120 ? product.description.slice(0, 120) + '…' : product.description}
      </p>

      {/* Suitable For */}
      <div style={{ marginBottom: '10px' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '5px' }}>Suitable For</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {product.skin_types.map((st) => (
            <span key={st} style={{ fontSize: '0.75rem', fontWeight: 600, color: '#625B71', background: '#F5F3FF', border: '1px solid #EDE9FE', borderRadius: '9999px', padding: '2px 8px' }}>{st}</span>
          ))}
        </div>
      </div>

      {/* Key Ingredients */}
      <div style={{ marginBottom: '10px' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#171329', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '5px' }}>Key Ingredients</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {product.key_ingredients.slice(0, 3).map((ing) => (
            <span key={ing} className="ingredient-pill">{ing}</span>
          ))}
          {product.key_ingredients.length > 3 && (
            <span className="ingredient-pill">+{product.key_ingredients.length - 3} more</span>
          )}
        </div>
      </div>

      {/* Why Recommended (only on recommendation cards) */}
      {isRecommendation && (
        <div style={{ background: '#F8F7FF', borderRadius: '10px', padding: '0.65rem 0.85rem', marginBottom: '10px' }}>
          <p style={{ fontSize: '0.8rem', color: '#625B71', margin: 0, maxWidth: '100%', lineHeight: 1.45 }}>
            {product.why_recommended.length > 110 ? product.why_recommended.slice(0, 110) + '…' : product.why_recommended}
          </p>
        </div>
      )}

      {/* Routine + How to Use row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span className="routine-pill">{product.routine}</span>
        <span style={{ fontSize: '0.78rem', color: '#8A8398' }}>
          {product.how_to_use.length > 55 ? product.how_to_use.slice(0, 55) + '…' : product.how_to_use}
        </span>
      </div>

      {/* Spacer to push actions to bottom */}
      <div style={{ flex: 1 }} />

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F5F3FF', paddingTop: '16px' }}>
        <button
          onClick={() => onViewDetails(product)}
          style={{
            flex: 1, height: '42px', borderRadius: '12px', border: '1.5px solid #7C3AED',
            background: 'transparent', color: '#7C3AED', fontWeight: 600, fontSize: '0.875rem',
            cursor: 'pointer', transition: 'all 0.18s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F5F3FF'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          View Details
        </button>
        <button
          onClick={() => onAddToRoutine(product.product_name)}
          style={{
            flex: 1, height: '42px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
            color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem',
            border: 'none', cursor: 'pointer', transition: 'opacity 0.18s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          + Add to Routine
        </button>
      </div>
    </div>
  );
}

// ─── MAIN PRODUCTS PAGE ──────────────────────────────────────────────────────
const CATEGORY_ICONS = {
  'Cleanser': '🧴',
  'Serum': '💧',
  'Essence': '✨',
  'Moisturizer': '🌿',
  'Sunscreen': '☀️',
  'Treatment': '⚗️',
  'Body Care': '🛁',
};

const CATEGORY_DESC = {
  'Cleanser': 'Gentle cleansing formulations for daily use.',
  'Serum': 'Targeted active serums for specific skin concerns.',
  'Essence': 'Lightweight hydrating and calming essences.',
  'Moisturizer': 'Hydration and barrier support for all skin types.',
  'Sunscreen': 'Daily broad-spectrum UV protection.',
  'Treatment': 'Targeted active treatments for specific concerns.',
  'Body Care': 'Gentle supportive formulations for body skin.',
};

function Products() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Filter state
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedSkinType, setSelectedSkinType] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');

  // Results state
  const [recommendations, setRecommendations] = useState(null); // null = not yet searched
  const [hasSearched, setHasSearched] = useState(false);

  // Modal state
  const [detailProduct, setDetailProduct] = useState(null);
  const [authPromptProduct, setAuthPromptProduct] = useState(null);

  // Tips
  const tips = hasSearched && (selectedSkinType || selectedConcern)
    ? getSkincareTips(selectedSkinType || 'Normal', selectedConcern || '')
    : [];

  const handleShowRecommendations = () => {
    if (!selectedConcern && !selectedSkinType) {
      toast.warn('Please select at least a skin concern or skin type.');
      return;
    }
    const results = getRecommendations(selectedConcern, selectedSkinType, selectedProductType);
    setRecommendations(results);
    setHasSearched(true);

    // Scroll to results
    setTimeout(() => {
      const el = document.getElementById('recommendation-results');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    setSelectedConcern('');
    setSelectedSkinType('');
    setSelectedProductType('All Products');
    setSearchQuery('');
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
        routineChecklist = [
          { step: 'AM: Gentle Hydrating Cleanser', done: false },
          { step: 'AM: Broad-Spectrum SPF 50+ Sunscreen', done: false },
        ];
      }
      const newStep = { step: `Custom: ${productName}`, done: false };
      await updateChecklist([...routineChecklist, newStep]);
      toast.success(`"${productName}" added to your routine!`);
    } catch {
      toast.info(`"${productName}" selected for routine.`);
    }
  }, [isLoggedIn]);

  // Filtered catalog products (for browse section)
  const browseCatalog = getFilteredProducts(selectedProductType, searchQuery);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '100vh' }}>

      {/* ── MODALS ─────────────────────────────────────────────── */}
      {detailProduct && (
        <ProductModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onAddToRoutine={handleAddToRoutine}
        />
      )}
      {authPromptProduct && (
        <AuthPromptModal
          productName={authPromptProduct}
          onClose={() => setAuthPromptProduct(null)}
        />
      )}

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F8F7FF', borderBottom: '1px solid #EDE9FE', padding: '52px 0 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <span className="eyebrow" style={{ marginBottom: '20px' }}>
              <SparklesIcon size={13} style={{ color: '#7C3AED' }} />
              PERSONALIZED SKINCARE
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#171329', marginBottom: '16px', lineHeight: 1.15 }}>
              Skincare recommendations,<br />made for you.
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#625B71', lineHeight: 1.6, marginBottom: '28px', maxWidth: '520px' }}>
              Explore skincare options based on your skin type, concerns, and routine needs. Not sure about your skin? Use Radiant's AI Skin Analysis.
            </p>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                style={{ height: '50px', padding: '0 1.5rem', fontSize: '0.975rem', fontWeight: 700, color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => navigate('/ai-consultation')}
              >
                <ScanIcon size={17} /> Analyze My Skin
              </button>
              <button
                style={{
                  height: '50px', padding: '0 1.5rem', borderRadius: '14px', fontSize: '0.975rem', fontWeight: 600,
                  color: '#7C3AED', background: 'transparent', border: '1.5px solid #7C3AED',
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  transition: 'background 0.18s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                onClick={() => {
                  document.getElementById('finder-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse All Products ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PRODUCT FINDER ──────────────────────────────────── */}
      <section id="finder-section" style={{ padding: '48px 0 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Finder Header */}
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#171329', marginBottom: '8px' }}>
              Find Products For You
            </h2>
            <p style={{ fontSize: '0.975rem', color: '#625B71', margin: 0, maxWidth: '480px' }}>
              Tell us what you're looking for and we'll show relevant skincare options.
            </p>
          </div>

          {/* Filter Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EDE9FE', borderRadius: '20px', padding: '24px 28px', marginBottom: '36px', boxShadow: '0 2px 12px rgba(124,58,237,0.04)' }}>
            <div className="filter-bar">
              {/* Skin Concern */}
              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, color: '#171329', marginBottom: '8px' }}>Skin Concern</label>
                <select
                  value={selectedConcern}
                  onChange={e => setSelectedConcern(e.target.value)}
                  style={{ height: '48px', borderRadius: '12px', border: '1px solid #E5E0EF', color: selectedConcern ? '#171329' : '#8A8398', fontSize: '0.9rem' }}
                >
                  <option value="">Select Concern</option>
                  {SKIN_CONCERNS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Skin Type */}
              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, color: '#171329', marginBottom: '8px' }}>Skin Type</label>
                <select
                  value={selectedSkinType}
                  onChange={e => setSelectedSkinType(e.target.value)}
                  style={{ height: '48px', borderRadius: '12px', border: '1px solid #E5E0EF', color: selectedSkinType ? '#171329' : '#8A8398', fontSize: '0.9rem' }}
                >
                  <option value="">Select Skin Type</option>
                  {SKIN_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Product Type */}
              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, color: '#171329', marginBottom: '8px' }}>Product Type</label>
                <select
                  value={selectedProductType}
                  onChange={e => setSelectedProductType(e.target.value)}
                  style={{ height: '48px', borderRadius: '12px', border: '1px solid #E5E0EF', color: '#171329', fontSize: '0.9rem' }}
                >
                  {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Button */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleShowRecommendations}
                  className="btn btn-primary"
                  style={{ height: '48px', padding: '0 1.5rem', fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap' }}
                >
                  Show Recommendations
                </button>
              </div>
            </div>

            {/* Reset */}
            {hasSearched && (
              <div style={{ marginTop: '12px' }}>
                <button
                  onClick={handleReset}
                  style={{ background: 'none', border: 'none', color: '#8A8398', fontSize: '0.85rem', cursor: 'pointer', padding: '4px 0', textDecoration: 'underline' }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Don't know your skin? Banner */}
          {!hasSearched && (
            <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(236,72,153,0.04))', border: '1px solid #EDE9FE', borderRadius: '16px', padding: '16px 20px', marginBottom: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: '#171329', display: 'block', marginBottom: '2px' }}>
                  Not sure about your skin type?
                </strong>
                <span style={{ fontSize: '0.875rem', color: '#625B71' }}>
                  Radiant's AI Skin Analysis can help you understand your skin.
                </span>
              </div>
              <button
                className="btn btn-primary"
                style={{ height: '42px', padding: '0 1.25rem', fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF', flexShrink: 0 }}
                onClick={() => navigate('/ai-consultation')}
              >
                <ScanIcon size={15} /> Analyze My Skin →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. RECOMMENDATION RESULTS ──────────────────────────── */}
      {hasSearched && (
        <section id="recommendation-results" style={{ padding: '0 0 48px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

            {/* Results Header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '8px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#171329' }}>
                  Recommended for You
                </h2>
                {(selectedSkinType || selectedConcern) && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {selectedSkinType && <span className="status-badge">{selectedSkinType} Skin</span>}
                    {selectedConcern && <span className="status-badge pink">{selectedConcern}</span>}
                  </div>
                )}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#625B71', margin: 0 }}>
                {recommendations && recommendations.length > 0
                  ? `${recommendations.length} relevant skincare option${recommendations.length !== 1 ? 's' : ''} found based on your selections.`
                  : 'No close matches found — try adjusting your selections.'}
              </p>
            </div>

            {/* No Results */}
            {recommendations && recommendations.length === 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #EDE9FE', borderRadius: '20px', padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#171329', marginBottom: '8px' }}>
                  No exact matches found
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#625B71', marginBottom: '20px', maxWidth: '340px', margin: '0 auto 20px' }}>
                  Try selecting a different skin type, concern, or product category.
                </p>
                <button onClick={handleReset} className="btn btn-secondary" style={{ height: '42px', fontSize: '0.875rem' }}>
                  Reset Filters
                </button>
              </div>
            )}

            {/* Product Cards Grid */}
            {recommendations && recommendations.length > 0 && (
              <div className="grid-3" style={{ marginBottom: '40px' }}>
                {recommendations.map(({ product, score, scoreLabel }) => (
                  <ProductCard
                    key={product.product_id}
                    item={{ product, score, scoreLabel }}
                    isRecommendation={true}
                    onViewDetails={setDetailProduct}
                    onAddToRoutine={handleAddToRoutine}
                  />
                ))}
              </div>
            )}

            {/* ── SKINCARE TIPS ──────────────────────────────── */}
            {tips.length > 0 && (
              <div style={{ background: '#F8F7FF', border: '1px solid #EDE9FE', borderRadius: '20px', padding: '28px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '20px' }}>
                  <CheckIcon size={18} style={{ color: '#7C3AED' }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#171329', margin: 0 }}>
                    Skincare Tips for You
                  </h3>
                  {selectedSkinType && selectedConcern && (
                    <span style={{ fontSize: '0.78rem', color: '#8A8398', fontStyle: 'italic' }}>
                      {selectedSkinType} · {selectedConcern}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tips.map((tip, i) => (
                    <div key={i} className="tip-card">
                      <span className="tip-number">{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: '0.9rem', color: '#625B71', lineHeight: 1.55 }}>{tip}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '16px', padding: '12px 16px', background: '#FFF1F7', border: '1px solid #FCE7F3', borderRadius: '10px' }}>
                  <p style={{ fontSize: '0.8rem', color: '#DB2777', margin: 0, maxWidth: '100%' }}>
                    These are general skincare tips for informational purposes only and are not a substitute for medical advice. Consult a healthcare professional for persistent or severe skin conditions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 4. BROWSE CATALOG ──────────────────────────────────── */}
      <section style={{ padding: '48px 0', borderTop: '1px solid #EDE9FE' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Section Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#171329', marginBottom: '6px' }}>
                {hasSearched ? 'Explore More Skincare Options' : 'Explore Our Skincare Options'}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#625B71', margin: 0 }}>
                {browseCatalog.length} formulation{browseCatalog.length !== 1 ? 's' : ''} available
              </p>
            </div>
            {/* Search */}
            <div style={{ position: 'relative', width: '260px' }}>
              <SearchIcon size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A8398' }} />
              <input
                type="text"
                placeholder="Search skincare options..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.4rem', height: '42px', borderRadius: '12px', border: '1px solid #E5E0EF', fontSize: '0.875rem', width: '100%' }}
              />
            </div>
          </div>

          {/* Category Explore Cards (shown when no search and no filter) */}
          {!searchQuery && selectedProductType === 'All Products' && !hasSearched && (
            <div className="grid-4" style={{ marginBottom: '32px' }}>
              {Object.entries(CATEGORY_ICONS).map(([cat, icon]) => (
                <button
                  key={cat}
                  className="category-card"
                  style={{ cursor: 'pointer', border: 'none', textAlign: 'left', width: '100%' }}
                  onClick={() => setSelectedProductType(cat)}
                >
                  <span style={{ fontSize: '1.75rem', marginBottom: '4px' }}>{icon}</span>
                  <strong style={{ fontSize: '0.95rem', fontWeight: 700, color: '#171329', display: 'block' }}>{cat}s</strong>
                  <span style={{ fontSize: '0.8rem', color: '#625B71', lineHeight: 1.4, display: 'block' }}>{CATEGORY_DESC[cat]}</span>
                </button>
              ))}
            </div>
          )}

          {/* Product Type Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {PRODUCT_TYPES.map(t => (
              <button
                key={t}
                onClick={() => setSelectedProductType(t)}
                style={{
                  height: '36px', padding: '0 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600,
                  border: selectedProductType === t ? '1.5px solid #7C3AED' : '1.5px solid #EDE9FE',
                  background: selectedProductType === t ? '#7C3AED' : '#FFFFFF',
                  color: selectedProductType === t ? '#FFFFFF' : '#625B71',
                  cursor: 'pointer', transition: 'all 0.18s ease',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {browseCatalog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#FFFFFF', border: '1px solid #EDE9FE', borderRadius: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔍</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#171329', marginBottom: '6px' }}>No results found</h3>
              <p style={{ fontSize: '0.875rem', color: '#625B71', margin: 0 }}>Try a different search term or product type.</p>
            </div>
          ) : (
            <div className="grid-3">
              {browseCatalog.map(product => (
                <ProductCard
                  key={product.product_id}
                  item={product}
                  isRecommendation={false}
                  onViewDetails={setDetailProduct}
                  onAddToRoutine={handleAddToRoutine}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 5. AI ANALYSIS CTA ─────────────────────────────────── */}
      <section style={{ padding: '48px 0', background: '#F8F7FF', borderTop: '1px solid #EDE9FE' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #1E1633 0%, #291B42 100%)', borderRadius: '24px', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#EC4899', display: 'block', marginBottom: '10px' }}>
                AI Skin Screening
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.2 }}>
                Not sure what your skin needs?
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#C4B5FD', margin: 0, maxWidth: '440px' }}>
                Radiant's AI Skin Analysis can help you understand your skin and explore relevant skincare options.
              </p>
            </div>
            <button
              className="btn btn-primary"
              style={{ height: '52px', padding: '0 1.75rem', fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
              onClick={() => navigate('/ai-consultation')}
            >
              <ScanIcon size={18} /> Analyze My Skin →
            </button>
          </div>

          {/* Medical Disclaimer */}
          <div className="medical-disclaimer-box" style={{ marginTop: '20px' }}>
            <ShieldIcon size={16} />
            <span>
              Skincare formulation information on this page is for general educational purposes only and does not constitute medical advice, diagnosis, or treatment recommendations. For persistent, severe, or concerning skin conditions, consult a qualified healthcare professional.
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Products;