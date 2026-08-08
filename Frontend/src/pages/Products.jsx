import React, { useState, useEffect } from 'react';
import { getRecommendationOptions, getProductRecommendation, updateChecklist, fetchDashboardData } from '../services/api';
import { toast } from 'react-toastify';
import { SearchIcon, FilterIcon, SparklesIcon, ArrowRightIcon } from '../components/Icons';

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
    <div className="page-container" style={{ padding: '2.5rem 1.5rem 4.5rem' }}>
      {/* Hero 2-Column Section */}
      <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem', marginBottom: '4rem' }}>
        {/* Left Column: Hero Copy */}
        <div>
          <span className="eyebrow" style={{ marginBottom: '1rem' }}>
            <SparklesIcon size={14} style={{ color: 'var(--primary-purple)' }} />
            SMART PRODUCT ENGINE
          </span>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#171329', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Smart Product Matching
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#625B71', lineHeight: 1.6, maxWidth: '520px', marginBottom: '2rem' }}>
            Find products based on your skin type and specific concerns using our machine-learning recommendation engine.
          </p>

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
            backgroundColor: '#FFFFFF',
            border: '1px solid #EDE9FE',
            borderRadius: '24px',
            padding: '36px 40px',
            boxShadow: '0 12px 40px rgba(124, 58, 237, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.75rem' }}>
            <SparklesIcon size={22} style={{ color: 'var(--secondary-pink)' }} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#171329', margin: 0 }}>
              Quick Product Matcher
            </h2>
          </div>

          <form onSubmit={handleRecommend} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#171329', marginBottom: '8px', display: 'block' }}>
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

            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#171329', marginBottom: '8px', display: 'block' }}>
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
                marginTop: '0.5rem',
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
  );
}

export default Products;