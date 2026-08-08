import React, { useState, useEffect } from 'react';
import { getRecommendationOptions, getProductRecommendation } from '../services/api';
import { toast } from 'react-toastify';

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
      toast.success('Recommendation fetched!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to load recommendation.');
    } finally {
      setLoading(false);
    }
  };

  const sampleProducts = [
    { name: 'Hydrating Hyaluronic Serum', concern: 'Dryness', skinType: 'Dry', ingredients: 'Hyaluronic Acid, Vitamin B5', usage: 'Apply 3 drops morning and night' },
    { name: 'Niacinamide 10% Blemish Treatment', concern: 'Acne', skinType: 'Oily', ingredients: 'Niacinamide, Zinc PCA', usage: 'Apply to clear skin twice daily' },
    { name: 'Centella Soothing Cream', concern: 'Redness', skinType: 'Sensitive', ingredients: 'Centella Asiatica, Ceramides', usage: 'Apply after serum to soothe redness' },
    { name: 'Vitamin C Radiant Brightening Fluid', concern: 'Hyperpigmentation', skinType: 'Combination', ingredients: 'L-Ascorbic Acid, Ferulic Acid', usage: 'Use in morning routine followed by SPF' },
  ];

  const filteredProducts = sampleProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.ingredients.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConcern = !selectedConcern || p.concern.toLowerCase() === selectedConcern.toLowerCase();
    const matchesSkinType = !selectedSkinType || p.skinType.toLowerCase() === selectedSkinType.toLowerCase();
    return matchesSearch && matchesConcern && matchesSkinType;
  });

  return (
    <div className="page-container">
      <div className="glass-card">
        <h1>🧴 Curated Skincare Products & AI Recommendations</h1>
        <p>Explore dermatologist-reviewed products personalized by our ML recommendation engine.</p>

        <form onSubmit={handleRecommend} className="dashboard-form grid-form" style={{ marginTop: '1.5rem' }}>
          <div>
            <label><strong>Skin Concern:</strong></label>
            <select value={selectedConcern} onChange={(e) => setSelectedConcern(e.target.value)}>
              <option value="">All Concerns</option>
              {concerns.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label><strong>Skin Type:</strong></label>
            <select value={selectedSkinType} onChange={(e) => setSelectedSkinType(e.target.value)}>
              <option value="">All Skin Types</option>
              {skinTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label><strong>Search Ingredients / Products:</strong></label>
            <input
              type="text"
              placeholder="Search by name or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Finding Best Product...' : 'Get AI Recommendation'}
          </button>
        </form>

        {recommendation && (
          <div className="product-recommendation-result glass-card" style={{ marginTop: '2rem' }}>
            <h2>🌟 AI Picked Recommendation: {recommendation.product_name}</h2>
            <p><strong>Ingredients:</strong> {recommendation.ingredients}</p>
            <p><strong>How to Use:</strong> {recommendation.how_to_use}</p>
            <p><strong>Expert Tips:</strong> {recommendation.tips}</p>
          </div>
        )}
      </div>

      <h2 style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Recommended Catalog</h2>
      <div className="product-grid">
        {filteredProducts.map((prod, idx) => (
          <div key={idx} className="glass-card">
            <h3>{prod.name}</h3>
            <span className="confidence-badge" style={{ margin: '0.5rem 0' }}>{prod.concern} • {prod.skinType}</span>
            <p><strong>Key Ingredients:</strong> {prod.ingredients}</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#475569' }}><strong>Usage:</strong> {prod.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;