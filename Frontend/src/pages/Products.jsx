import React, { useState, useEffect } from 'react';
import { getRecommendationOptions, getProductRecommendation } from '../services/api';
import { toast } from 'react-toastify';
import { SearchIcon, FilterIcon, SparklesIcon, CheckIcon } from '../components/Icons';

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
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="eyebrow">Formulation Engine</span>
        <h1>Skincare Products & Recommendation Catalog</h1>
        <p style={{ color: 'var(--slate-600)', maxWidth: '720px', margin: '0.5rem 0 0' }}>
          Explore curated formulations aligned with targeted active ingredients, or use our machine learning engine to recommend specific products.
        </p>
      </div>

      {/* Interactive Recommendation Generator Card */}
      <div className="card" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--primary-teal)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <SparklesIcon size={20} style={{ color: 'var(--primary-teal)' }} />
          <h3 style={{ margin: 0 }}>ML Product Recommendation Engine</h3>
        </div>

        <form onSubmit={handleRecommend} className="grid-3" style={{ alignItems: 'end', gap: '1.25rem' }}>
          <div>
            <label>Skin Concern:</label>
            <select value={selectedConcern} onChange={(e) => setSelectedConcern(e.target.value)}>
              <option value="">-- All Concerns --</option>
              {concerns.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Skin Type:</label>
            <select value={selectedSkinType} onChange={(e) => setSelectedSkinType(e.target.value)}>
              <option value="">-- All Skin Types --</option>
              {skinTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ height: '44px' }}>
            {loading ? 'Finding Match...' : 'Generate Match'}
          </button>
        </form>

        {recommendation && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--slate-200)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ color: 'var(--slate-900)' }}>Match: {recommendation.product_name}</h4>
              <span className="status-badge">AI Recommendation Result</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)', marginBottom: '0.35rem' }}>
              <strong>Key Active Ingredients:</strong> {recommendation.ingredients}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
              <strong>Application Protocol:</strong> {recommendation.how_to_use}
            </p>
          </div>
        )}
      </div>

      {/* Catalog Search & Filters Bar */}
      <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <div className="grid-3" style={{ alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <SearchIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
            <input
              type="text"
              placeholder="Search by product or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FilterIcon size={18} style={{ color: 'var(--slate-500)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)' }}>
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
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid-3">
        {filteredProducts.map((prod, idx) => (
          <div key={idx} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="status-badge">{prod.concern}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600 }}>{prod.skinType} Skin</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{prod.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
                <strong>Ingredients:</strong> {prod.ingredients}
              </p>
            </div>
            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--slate-200)', fontSize: '0.8rem', color: 'var(--slate-500)' }}>
              <strong>Usage:</strong> {prod.usage}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;