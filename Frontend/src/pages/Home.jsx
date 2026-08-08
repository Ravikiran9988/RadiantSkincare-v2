import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeroSection from '../components/Herosection.jsx';
import {
  ScanIcon,
  ShieldIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon,
  CalendarIcon,
  InfoIcon
} from '../components/Icons.jsx';
import { getRecommendationOptions, getProductRecommendation } from '../services/api';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [concerns, setConcerns] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedSkinType, setSelectedSkinType] = useState('');
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

  const handleRecommendPreview = async (e) => {
    e.preventDefault();
    if (!selectedConcern || !selectedSkinType) {
      toast.warn('Please select both a skin concern and skin type.');
      return;
    }

    setLoading(true);
    try {
      const res = await getProductRecommendation({
        concern: selectedConcern,
        skin_type: selectedSkinType,
      });
      setRecommendation(res.data || res);
      toast.success('Recommendation calculated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to get recommendation.');
    } finally {
      setLoading(false);
    }
  };

  const ingredientsList = [
    { name: 'Niacinamide (Vitamin B3)', concern: 'Redness & Pores', description: 'Supports skin barrier function, regulates sebum production, and calms surface redness.' },
    { name: 'Salicylic Acid (BHA)', concern: 'Acne & Congestion', description: 'Lipid-soluble beta hydroxy acid that exfoliates inside pore linings to clear breakouts.' },
    { name: 'Hyaluronic Acid', concern: 'Dehydration', description: 'Powerful humectant capable of holding up to 1000x its weight in moisture for plumpness.' },
    { name: 'Ceramides NP/AP', concern: 'Barrier Repair', description: 'Essential lipids that replenish inter-cellular cement and seal in long-lasting moisture.' },
    { name: 'L-Ascorbic Acid (Vitamin C)', concern: 'Hyperpigmentation', description: 'Potent antioxidant that neutralizes free radicals and brightens uneven skin tone.' },
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <div className="page-container" style={{ paddingBottom: '1rem' }}>
        <HeroSection />
      </div>

      {/* 2. Trust Indicators Bar */}
      <section style={{ backgroundColor: 'var(--soft-lavender)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.75rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div className="grid-4" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ScanIcon size={22} style={{ color: 'var(--primary-purple)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--dark-text)' }}>AI-Assisted Screening</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>ResNet50 vision engine</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldIcon size={22} style={{ color: 'var(--secondary-pink)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--dark-text)' }}>Secure Data</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>Isolated user history</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <SparklesIcon size={22} style={{ color: 'var(--primary-purple)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--dark-text)' }}>Personalized Recommendations</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>Active ingredient matching</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CalendarIcon size={22} style={{ color: 'var(--secondary-pink)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--dark-text)' }}>Skin Insights</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>Routine & screening history</span>
              </div>
            </div>
          </div>

          <div className="medical-disclaimer-box" style={{ marginTop: '1.25rem' }}>
            <ShieldIcon size={18} />
            <span>AI-generated screening information is for informational purposes only and is not a medical diagnosis. Consult a healthcare professional for clinical evaluation.</span>
          </div>
        </div>
      </section>

      {/* 3. Feature Section: Everything you need for better skincare */}
      <section className="page-container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow">Personalized AI Skincare MVP</span>
          <h2>Everything you need for better skincare.</h2>
          <p className="subheading" style={{ margin: '0.5rem auto 0' }}>
            From AI-assisted screening to personalized recommendations, routine building, and screening history tracking over time.
          </p>
        </div>

        <div className="grid-4">
          {/* 01 */}
          <div className="card card-hover">
            <span className="step-number step-1">01</span>
            <h3>AI Skin Screening</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Analyze your skin using our ResNet50-based computer vision model for automated pattern evaluation.
            </p>
          </div>

          {/* 02 */}
          <div className="card card-hover">
            <span className="step-number step-2">02</span>
            <h3>Personalized Recommendations</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Discover products and active formulations matched directly to your skin type and specific concerns.
            </p>
          </div>

          {/* 03 */}
          <div className="card card-hover">
            <span className="step-number step-1">03</span>
            <h3>Personalized Routine</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Build a simple morning and evening skincare routine tailored around your skin profile.
            </p>
          </div>

          {/* 04 */}
          <div className="card card-hover">
            <span className="step-number step-3">04</span>
            <h3>AI Screening History</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Save previous AI screening results and track your screening trends and model confidence history over time.
            </p>
          </div>
        </div>
      </section>

      {/* 4. How Radiant Works (3-Step Timeline) */}
      <section style={{ backgroundColor: 'var(--soft-rose)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '4rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="eyebrow">Product Workflow</span>
            <h2>How Radiant Works</h2>
            <p className="subheading" style={{ margin: '0.5rem auto 0' }}>
              Three simple steps to understand your skin, build a routine, and track your screening history.
            </p>
          </div>

          <div className="grid-3">
            <div className="step-card">
              <span className="step-number step-1">01</span>
              <h3>Analyze</h3>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Upload a clear image of your skin and describe any noticeable symptoms or areas of concern.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number step-2">02</span>
              <h3>Understand</h3>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                AI-assisted screening evaluates image patterns and identifies potential skin concern categories.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number step-3">03</span>
              <h3>Improve</h3>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Explore personalized products, build your daily routine, and track your screening history over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dark AI Technology Section (#1E1633) */}
      <section className="dark-section" style={{ padding: '4.5rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <div>
              <span className="eyebrow" style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: 'var(--secondary-pink)' }}>
                Computer Vision Architecture
              </span>
              <h2 style={{ marginBottom: '1.15rem', color: '#ffffff' }}>AI that helps you understand your skin.</h2>
              <p style={{ color: '#C4B5FD', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.65 }}>
                RadiantSkincare uses a ResNet50 convolutional neural network to evaluate visual features across 23 dermatological categories. Machine learning algorithms pair detected concerns with optimal active formulation recommendations.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size={18} style={{ color: 'var(--secondary-pink)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#E9E4F0' }}><strong>ResNet50 Vision Engine:</strong> Automated pattern recognition for visual skin features.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size={18} style={{ color: 'var(--primary-purple)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#E9E4F0' }}><strong>Confidence Metrics:</strong> Calculates prediction confidence distributions without absolute claims.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size={18} style={{ color: 'var(--secondary-pink)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#E9E4F0' }}><strong>Ingredient Intelligence:</strong> Pairs concerns with evidence-based active ingredients.</span>
                </div>
              </div>
            </div>

            <div className="dark-card">
              <h3 style={{ color: '#ffffff', marginBottom: '1.15rem' }}>Screening Capabilities</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#E9E4F0' }}>Acne & Rosacea Features</span>
                  <span className="status-badge">ResNet50 Vision</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#E9E4F0' }}>Eczema & Dermatitis Features</span>
                  <span className="status-badge">ResNet50 Vision</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#E9E4F0' }}>Pigmentation & Texture Screening</span>
                  <span className="status-badge">ResNet50 Vision</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#E9E4F0' }}>Scikit-learn Product Recommender</span>
                  <span className="status-badge pink">ML Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Personalized Skincare Routine Showcase */}
      <section className="page-container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow">Structured Protocol</span>
          <h2>Your Personalized Skincare Routine</h2>
          <p className="subheading" style={{ margin: '0.5rem auto 0' }}>
            Build and maintain a daily morning and evening skincare routine tailored to your skin profile.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '2rem' }}>
          {/* Morning Routine Box */}
          <div className="card" style={{ borderTop: '4px solid var(--primary-purple)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0 }}>Morning Routine</h3>
              <span className="status-badge">AM Protocol</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: 'var(--soft-lavender)', borderRadius: 'var(--radius-md)' }}>
                <span className="step-number step-1" style={{ margin: 0, width: '26px', height: '26px', fontSize: '0.75rem' }}>01</span>
                <div>
                  <strong style={{ color: 'var(--dark-text)' }}>Gentle Hydrating Cleanser</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary-text)', display: 'block' }}>Removes overnight oil without stripping moisture</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: 'var(--soft-lavender)', borderRadius: 'var(--radius-md)' }}>
                <span className="step-number step-1" style={{ margin: 0, width: '26px', height: '26px', fontSize: '0.75rem' }}>02</span>
                <div>
                  <strong style={{ color: 'var(--dark-text)' }}>Antioxidant Serum (Vitamin C / Niacinamide)</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary-text)', display: 'block' }}>Neutralizes environmental stressors and brightens tone</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: 'var(--soft-lavender)', borderRadius: 'var(--radius-md)' }}>
                <span className="step-number step-1" style={{ margin: 0, width: '26px', height: '26px', fontSize: '0.75rem' }}>03</span>
                <div>
                  <strong style={{ color: 'var(--dark-text)' }}>Lightweight Barrier Moisturizer</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary-text)', display: 'block' }}>Seals in hydration and strengthens skin barrier</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: 'var(--soft-lavender)', borderRadius: 'var(--radius-md)' }}>
                <span className="step-number step-1" style={{ margin: 0, width: '26px', height: '26px', fontSize: '0.75rem' }}>04</span>
                <div>
                  <strong style={{ color: 'var(--dark-text)' }}>Broad-Spectrum SPF 50+ Sunscreen</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary-text)', display: 'block' }}>Essential UV protection against sun damage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Evening Routine Box */}
          <div className="card" style={{ borderTop: '4px solid var(--secondary-pink)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0 }}>Evening Routine</h3>
              <span className="status-badge pink">PM Protocol</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: 'var(--soft-rose)', borderRadius: 'var(--radius-md)' }}>
                <span className="step-number step-3" style={{ margin: 0, width: '26px', height: '26px', fontSize: '0.75rem' }}>01</span>
                <div>
                  <strong style={{ color: 'var(--dark-text)' }}>Double Cleanser / Salicylic Cleanser</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary-text)', display: 'block' }}>Clears sunscreen, makeup, and daily environmental debris</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: 'var(--soft-rose)', borderRadius: 'var(--radius-md)' }}>
                <span className="step-number step-3" style={{ margin: 0, width: '26px', height: '26px', fontSize: '0.75rem' }}>02</span>
                <div>
                  <strong style={{ color: 'var(--dark-text)' }}>Targeted Treatment (BHA / Retinoid / Centella)</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary-text)', display: 'block' }}>Addresses specific concerns like acne congestion or texture</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: 'var(--soft-rose)', borderRadius: 'var(--radius-md)' }}>
                <span className="step-number step-3" style={{ margin: 0, width: '26px', height: '26px', fontSize: '0.75rem' }}>03</span>
                <div>
                  <strong style={{ color: 'var(--dark-text)' }}>Rich Ceramide Barrier Cream</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary-text)', display: 'block' }}>Deep overnight nourishment and hydration lock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Smart Product Matching Section */}
      <section style={{ backgroundColor: 'var(--soft-lavender)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '4rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Smart Product Engine</span>
              <h2 style={{ marginBottom: '1rem' }}>Smart Product Matching</h2>
              <p className="subheading" style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Find products based on your skin type and specific concerns using our scikit-learn machine learning engine.
              </p>
              <Link to="/products" className="btn btn-primary">
                Explore Product Catalog <ArrowRightIcon size={16} />
              </Link>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1.15rem' }}>Quick Product Matcher</h3>
              <form onSubmit={handleRecommendPreview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label>Skin Concern:</label>
                  <select value={selectedConcern} onChange={(e) => setSelectedConcern(e.target.value)} required>
                    <option value="">-- Select Skin Concern --</option>
                    {concerns.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Skin Type:</label>
                  <select value={selectedSkinType} onChange={(e) => setSelectedSkinType(e.target.value)} required>
                    <option value="">-- Select Skin Type --</option>
                    {skinTypes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-secondary" disabled={loading}>
                  {loading ? 'Processing...' : 'Generate Match'}
                </button>
              </form>

              {recommendation && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--dark-text)' }}>Recommended: {recommendation.product_name}</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', marginTop: '0.25rem' }}>
                    <strong>Ingredients:</strong> {recommendation.ingredients}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. AI Screening History & Confidence Trend */}
      <section className="page-container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow">Confidence Trend</span>
          <h2>AI Screening History</h2>
          <p className="subheading" style={{ margin: '0.5rem auto 0' }}>
            Review historical screening classifications and model prediction confidence over time.
          </p>
        </div>

        <div className="grid-3" style={{ marginBottom: '1.25rem' }}>
          <div className="card">
            <span className="status-badge" style={{ marginBottom: '0.75rem' }}>JUL 10</span>
            <h4>Initial Screening</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', margin: '0.35rem 0' }}>Skin Screening Features</p>
            <strong style={{ fontSize: '0.95rem', color: 'var(--primary-purple)' }}>Model Confidence: 79.6%</strong>
          </div>

          <div className="card">
            <span className="status-badge pink" style={{ marginBottom: '0.75rem' }}>JUL 25</span>
            <h4>Second Screening</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', margin: '0.35rem 0' }}>Acne Features</p>
            <strong style={{ fontSize: '0.95rem', color: 'var(--secondary-pink)' }}>Model Confidence: 82.1%</strong>
          </div>

          <div className="card" style={{ border: '2px solid var(--primary-purple)' }}>
            <span className="status-badge" style={{ marginBottom: '0.75rem' }}>AUG 08</span>
            <h4>Latest Screening</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', margin: '0.35rem 0' }}>Acne & Rosacea Features</p>
            <strong style={{ fontSize: '0.95rem', color: 'var(--primary-purple)' }}>Model Confidence: 88.4%</strong>
          </div>
        </div>

        {/* Mandatory Explanatory Note Callout Box */}
        <div style={{
          backgroundColor: 'var(--soft-lavender)',
          border: '1px solid var(--border-color)',
          borderLeft: '4px solid var(--primary-purple)',
          padding: '0.85rem 1.15rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          color: 'var(--dark-text)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          marginBottom: '2rem'
        }}>
          <InfoIcon size={18} style={{ color: 'var(--primary-purple)', flexShrink: 0 }} />
          <span>Note: Confidence reflects the model's prediction confidence and does not indicate medical improvement.</span>
        </div>

        {/* Re-analysis CTA Box */}
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem', background: 'var(--soft-rose)' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Ready for another screening?</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', marginBottom: '1.25rem' }}>
            Upload a new image to add another AI screening to your history.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/ai-consultation')}>
            <ScanIcon size={18} /> Analyze My Skin
          </button>
        </div>
      </section>

      {/* 9. Ingredient Insights Section */}
      <section style={{ backgroundColor: 'var(--soft-rose)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '4rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="eyebrow">Formulation Science</span>
            <h2>Ingredient Insights</h2>
            <p className="subheading" style={{ margin: '0.5rem auto 0' }}>
              Common active ingredients used in modern personalized skincare formulations.
            </p>
          </div>

          <div className="grid-3">
            {ingredientsList.map((ing, i) => (
              <div key={i} className="card card-hover">
                <span className="status-badge pink" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>{ing.concern}</span>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--dark-text)' }}>{ing.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)' }}>{ing.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
