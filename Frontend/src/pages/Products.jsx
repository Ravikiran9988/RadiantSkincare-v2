import React, { useState, useEffect } from 'react';
import { getRecommendationOptions, getProductRecommendation, updateChecklist, fetchDashboardData } from '../services/api';
import { toast } from 'react-toastify';
import { SearchIcon, FilterIcon, SparklesIcon, ArrowRightIcon, CheckIcon } from '../components/Icons';

function Products() {
  const [concerns, setConcerns] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedSkinType, setSelectedSkinType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await getRecommendationOptions();
        setConcerns(data.concerns || []);
        setSkinTypes(data.skin_types || []);
      } catch (err) {
        console.error('Error fetching options:', err);
      }
    };
    loadOptions();
  }, []);

  const handleRecommend = async (e) => {
    e.preventDefault();
    if (!selectedConcern || !selectedSkinType) {
      toast.warn('Please select both a skin concern and a skin type.');
      return;
    }

    setLoading(true);
    try {
      const data = await getProductRecommendation({
        concern: selectedConcern,
        skin_type: selectedSkinType,
      });
      setRecommendation(data.data || data);
      toast.success('Product match generated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to load recommendation.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToRoutine = async (productName) => {
    try {
      let routineChecklist = [];
      try {
        const res = await fetchDashboardData();
        routineChecklist = res.data?.routineChecklist || [];
      } catch (e) {
        routineChecklist = [
          { step: 'AM: Gentle Hydrating Cleanser', done: false },
          { step: 'AM: Broad-Spectrum SPF 50+ Sunscreen', done: false },
        ];
      }

      const newStep = { step: `Custom: ${productName}`, done: false };
      const updated = [...routineChecklist, newStep];
      await updateChecklist(updated);
      toast.success(`Added "${productName}" to your daily routine!`);
    } catch (err) {
      console.error('Error adding to routine:', err);
      toast.info(`Product "${productName}" selected for routine.`);
    }
  };

  const scrollToCatalog = () => {
    const catalogEl = document.getElementById('product-catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sampleProducts = [
    { name: 'Hydrating Hyaluronic Serum', concern: 'Dryness', skinType: 'Dry', ingredients: 'Hyaluronic Acid, Vitamin B5, Glycerin', usage: 'Apply 3-4 drops onto clean damp skin morning & night.' },
    { name: 'Niacinamide 10% Blemish Treatment', concern: 'Acne', skinType: 'Oily', ingredients: 'Niacinamide, Zinc PCA, Salicylic Acid', usage: 'Apply thin layer to affected zones morning & evening.' },
    { name: 'Centella Soothing Barrier Gel Cream', concern: 'Redness', skinType: 'Sensitive', ingredients: 'Centella Asiatica, Madecassoside, Ceramides', usage: 'Smooth gently over face to calm active irritation.' },
    { name: 'Vitamin C Brightening Antioxidant Fluid', concern: 'Hyperpigmentation', skinType: 'Combination', ingredients: 'L-Ascorbic Acid, Ferulic Acid, Vitamin E', usage: 'Apply 4 drops in morning routine followed by broad-spectrum SPF.' },
    { name: 'Salicylic Acid 2% Exfoliating Cleanser', concern: 'Acne', skinType: 'Combination', ingredients: 'Salicylic Acid, Tea Tree Extract', usage: 'Lather gentle foam twice daily during cleansing.' },
    { name: 'Ceramide Moisture Lock Treatment', concern: 'Aging', skinType: 'Dry', ingredients: 'Ceramides NP/AP, Peptide Complex', usage: 'Massage into face and neck as final evening skincare step.' },
  ];

  const filteredProducts = sampleProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ingredients.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConcern = !selectedConcern || p.concern.toLowerCase() === selectedConcern.toLowerCase();
    const matchesSkinType = !selectedSkinType || p.skinType.toLowerCase() === selectedSkinType.toLowerCase();
    return matchesSearch && matchesConcern && matchesSkinType;
  });

  return (
    <div>
      {/* 1. Hero 2-Column Section (Smart Product Matching Engine) */}
      <section style={{ backgroundColor: '#F8F7FF', borderBottom: '1px solid var(--border-color)', marginBottom: '3.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 32px' }}>
          <div className="smart-product-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(520px, 1.1fr)', gap: '56px', alignItems: 'center' }}>
            {/* Left Column: Hero Copy & Benefit Bullet Points */}
            <div>
              <span className="eyebrow" style={{ marginBottom: '24px' }}>
                <SparklesIcon size={14} style={{ color: 'var(--primary-purple)' }} />
                SMART PRODUCT ENGINE
              </span>

              <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#171329', marginBottom: '20px', lineHeight: 1.1, letterSpacing: '-1.5px', whiteSpace: 'nowrap' }}>
                Smart Product Matching
              </h1>

              <p style={{ fontSize: '1.05rem', color: '#625B71', lineHeight: 1.6, maxWidth: '520px', marginBottom: '28px' }}>
                Find skincare products tailored to your skin type, concerns, and ingredient preferences. Select your profile and let Radiant match relevant formulations from the product catalog.
              </p>

              {/* 3 Compact Benefit Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '520px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(124, 58, 237, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckIcon size={14} style={{ color: '#7C3AED' }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.975rem', fontWeight: 600, color: '#171329', display: 'block', marginBottom: '2px' }}>
                      Skin-aware matching
                    </strong>
                    <span style={{ fontSize: '0.9rem', color: '#625B71', lineHeight: 1.45, display: 'block' }}>
                      Recommendations based on your selected skin profile.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(236, 72, 153, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckIcon size={14} style={{ color: '#EC4899' }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.975rem', fontWeight: 600, color: '#171329', display: 'block', marginBottom: '2px' }}>
                      Ingredient-focused
                    </strong>
                    <span style={{ fontSize: '0.9rem', color: '#625B71', lineHeight: 1.45, display: 'block' }}>
                      Connect concerns with relevant active ingredients.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(124, 58, 237, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckIcon size={14} style={{ color: '#7C3AED' }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.975rem', fontWeight: 600, color: '#171329', display: 'block', marginBottom: '2px' }}>
                      Personalized picks
                    </strong>
                    <span style={{ fontSize: '0.9rem', color: '#625B71', lineHeight: 1.45, display: 'block' }}>
                      Discover products that fit your skincare routine.
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={scrollToCatalog}
                className="btn btn-primary"
                style={{
                  height: '56px',
                  padding: '0 2rem',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                Explore Product Catalog <ArrowRightIcon size={18} style={{ color: '#FFFFFF' }} />
              </button>
            </div>

            {/* Right Column: Quick Product Matcher Card */}
            <div
              className="card"
              style={{
                width: '100%',
                maxWidth: '620px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EDE9FE',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 12px 40px rgba(124, 58, 237, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '28px' }}>
                <SparklesIcon size={22} style={{ color: 'var(--secondary-pink)' }} />
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#171329', margin: 0 }}>
                  Quick Product Matcher
                </h2>
              </div>

              <form onSubmit={handleRecommend} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#171329', marginBottom: '10px', display: 'block' }}>
                    Skin Concern:
                  </label>
                  <select
                    value={selectedConcern}
                    onChange={(e) => setSelectedConcern(e.target.value)}
                    style={{
                      height: '56px',
                      borderRadius: '14px',
                      border: '1px solid #E7E0F5',
                      color: '#171329',
                      padding: '0 16px',
                      fontSize: '1rem'
                    }}
                    required
                  >
                    <option value="">-- Select Skin Concern --</option>
                    {concerns.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#171329', marginBottom: '10px', display: 'block' }}>
                    Skin Type:
                  </label>
                  <select
                    value={selectedSkinType}
                    onChange={(e) => setSelectedSkinType(e.target.value)}
                    style={{
                      height: '56px',
                      borderRadius: '14px',
                      border: '1px solid #E7E0F5',
                      color: '#171329',
                      padding: '0 16px',
                      fontSize: '1rem'
                    }}
                    required
                  >
                    <option value="">-- Select Skin Type --</option>
                    {skinTypes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    height: '56px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 8px 24px rgba(124, 58, 237, 0.22)'
                  }}
                >
                  {loading ? 'Finding Match...' : 'Generate Match'}
                </button>
              </form>

              {recommendation && (
                <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #EDE9FE' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ color: '#171329', margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
                      Match: {recommendation.product_name}
                    </h4>
                    <span className="status-badge pink" style={{ fontSize: '0.75rem' }}>AI Recommendation Match</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#625B71', marginBottom: '0.5rem' }}>
                    <strong>Key Ingredients:</strong> {recommendation.ingredients}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#625B71', marginBottom: '1rem' }}>
                    <strong>Usage:</strong> {recommendation.how_to_use}
                  </p>
                  <button
                    className="btn btn-secondary"
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', borderRadius: '10px' }}
                    onClick={() => handleAddToRoutine(recommendation.product_name)}
                  >
                    + Add to Routine
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog Content */}
      <div className="page-container" style={{ padding: '0 1.5rem 4.5rem' }}>
        {/* Catalog Search & Filter Bar */}
        <div id="product-catalog-section" className="card" style={{ padding: '1.5rem 2rem', marginBottom: '2.5rem', borderRadius: '20px' }}>
          <div className="grid-3" style={{ alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <SearchIcon size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#625B71' }} />
              <input
                type="text"
                placeholder="Search by product name or ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.75rem', height: '52px', borderRadius: '12px' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <FilterIcon size={18} style={{ color: 'var(--primary-purple)' }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#171329' }}>
                Catalog Matches: {filteredProducts.length}
              </span>
            </div>

            {(selectedConcern || selectedSkinType || searchQuery) && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedConcern('');
                  setSelectedSkinType('');
                  setSearchQuery('');
                }}
                style={{ height: '48px', fontSize: '0.9rem', borderRadius: '12px' }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid with Add to Routine CTA */}
        <div className="grid-3">
          {filteredProducts.map((prod, idx) => (
            <div key={idx} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '20px', padding: '24px 28px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                  <span className="status-badge">{prod.concern}</span>
                  <span style={{ fontSize: '0.8rem', color: '#625B71', fontWeight: 600 }}>{prod.skinType} Skin</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#171329', marginBottom: '0.5rem' }}>{prod.name}</h3>
                <p style={{ fontSize: '0.875rem', color: '#625B71', marginBottom: '0.85rem', lineHeight: 1.5 }}>
                  <strong>Active Ingredients:</strong> {prod.ingredients}
                </p>
              </div>
              <div style={{ paddingTop: '0.85rem', borderTop: '1px solid #EDE9FE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#625B71' }}>{prod.usage.slice(0, 32)}...</span>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem', borderRadius: '10px' }}
                  onClick={() => handleAddToRoutine(prod.name)}
                >
                  + Add to Routine
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;