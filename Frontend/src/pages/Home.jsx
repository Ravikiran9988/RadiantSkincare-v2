import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeroSection from '../components/Herosection.jsx';
import {
  ScanIcon,
  ShieldIcon,
  StethoscopeIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon,
  DropletIcon,
  SunIcon,
  FilterIcon
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

  return (
    <div>
      {/* 1. Hero Section */}
      <div className="page-container" style={{ paddingBottom: '1rem' }}>
        <HeroSection />
      </div>

      {/* 2. Trust & Safety Section */}
      <section style={{ backgroundColor: 'var(--slate-100)', borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)', padding: '2rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div className="grid-4" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ScanIcon size={22} style={{ color: 'var(--primary-teal)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--slate-900)' }}>AI-Assisted Screening</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>ResNet50 computer vision</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldIcon size={22} style={{ color: 'var(--primary-teal)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--slate-900)' }}>Secure User Data</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>HIPAA-aligned data isolation</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <SparklesIcon size={22} style={{ color: 'var(--primary-teal)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--slate-900)' }}>Personalized Recommendations</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>Targeted ingredient matching</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <StethoscopeIcon size={22} style={{ color: 'var(--primary-teal)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--slate-900)' }}>Dermatologist Consultations</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>Real-time telehealth rooms</span>
              </div>
            </div>
          </div>

          <div className="medical-disclaimer-box" style={{ marginTop: '1.5rem' }}>
            <ShieldIcon size={18} />
            <span>AI results are for informational screening purposes and are not a medical diagnosis. Please consult a dermatologist for clinical evaluation.</span>
          </div>
        </div>
      </section>

      {/* 3. Feature Section: Everything you need for better skincare */}
      <section className="page-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="eyebrow">Comprehensive Platform</span>
          <h2>Everything you need for better skincare.</h2>
          <p className="subheading" style={{ margin: '0.75rem auto 0' }}>
            A unified suite combining machine learning analysis, clinical recommendations, and professional consultation access.
          </p>
        </div>

        <div className="grid-4">
          <div className="card card-hover">
            <span className="step-number">01</span>
            <h3>AI Skin Screening</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Analyze uploaded skin images using our ResNet50 vision model to screen features across 23 dermatological categories.
            </p>
          </div>

          <div className="card card-hover">
            <span className="step-number">02</span>
            <h3>Personalized Recommendations</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Match your exact skin concern and skin type to optimized formulations, ingredients, and daily usage guidelines.
            </p>
          </div>

          <div className="card card-hover">
            <span className="step-number">03</span>
            <h3>Dermatologist Consultations</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Schedule appointments and talk with dermatologists via secure, room-isolated real-time chat.
            </p>
          </div>

          <div className="card card-hover">
            <span className="step-number">04</span>
            <h3>Skincare Insights</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Track daily routine checklists, review analysis history, and receive climate-aware daily guidance.
            </p>
          </div>
        </div>
      </section>

      {/* 4. How It Works (3-Step Section) */}
      <section style={{ backgroundColor: 'var(--slate-100)', borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)', padding: '4.5rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow">Simple Workflow</span>
            <h2>How RadiantSkincare Works</h2>
            <p className="subheading" style={{ margin: '0.5rem auto 0' }}>
              Three straightforward steps to understanding and supporting your skin.
            </p>
          </div>

          <div className="grid-3">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Analyze</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Upload a clear skin photo and describe any noticeable symptoms or areas of concern.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Understand</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                AI algorithms evaluate image features, outputting confidence metrics and potential condition categories.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Improve</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Receive product recommendations or schedule a direct consultation with an available doctor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI Technology Explanation Section */}
      <section className="page-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div>
            <span className="eyebrow">Rigorous Machine Learning</span>
            <h2 style={{ marginBottom: '1rem' }}>AI that helps you understand your skin.</h2>
            <p className="subheading" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
              AI-assisted skin screening helps identify visual patterns that may warrant further attention. Our ResNet50 convolutional neural network evaluates image features against 23 categories, computing probability distributions to assist your skincare decisions.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckIcon size={18} style={{ color: 'var(--primary-teal)', flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Pattern Recognition:</strong> Screens visual characteristics including redness, texture, and pigmentation.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckIcon size={18} style={{ color: 'var(--primary-teal)', flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Confidence Evaluation:</strong> Computes probability scores rather than making absolute claims.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckIcon size={18} style={{ color: 'var(--primary-teal)', flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Ingredient Matching:</strong> Pairs identified concerns with recommended active ingredients.</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Screening Capabilities</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--slate-200)' }}>
                <span>Acne & Rosacea Screening</span>
                <span className="status-badge">ResNet50 Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--slate-200)' }}>
                <span>Eczema & Dermatitis Features</span>
                <span className="status-badge">ResNet50 Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--slate-200)' }}>
                <span>Pigmentation & Light Disorders</span>
                <span className="status-badge">ResNet50 Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Scikitlearn Recommendation Engine</span>
                <span className="status-badge">ML Model Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Product Recommendation Section */}
      <section style={{ backgroundColor: 'var(--slate-100)', borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)', padding: '4.5rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Smart Product Engine</span>
              <h2 style={{ marginBottom: '1rem' }}>Targeted product recommendations.</h2>
              <p className="subheading" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                Our recommendation model analyzes your specific skin concern and skin type to output personalized product matches, active ingredient explanations, and application tips.
              </p>
              <Link to="/products" className="btn btn-primary">
                Explore Full Product Catalog <ArrowRightIcon size={16} />
              </Link>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1.25rem' }}>Quick Recommendation Preview</h3>
              <form onSubmit={handleRecommendPreview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label>Skin Concern:</label>
                  <select value={selectedConcern} onChange={(e) => setSelectedConcern(e.target.value)} required>
                    <option value="">-- Select Concern --</option>
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
                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--slate-200)' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--slate-900)' }}>Recommended: {recommendation.product_name}</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>
                    <strong>Ingredients:</strong> {recommendation.ingredients}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Doctor Consultation Section */}
      <section className="page-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div className="card" style={{ padding: '3rem 2.5rem', background: 'linear-gradient(135deg, #ffffff 0%, var(--primary-teal-wash) 100%)', border: '1px solid var(--primary-teal-light)' }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '2.5rem' }}>
            <div>
              <span className="eyebrow">Professional Healthcare Access</span>
              <h2 style={{ marginBottom: '1rem' }}>When you need expert guidance, talk to a dermatologist.</h2>
              <p className="subheading" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                Schedule confidential appointments and communicate through encrypted real-time chat rooms with dermatologists for medical evaluation.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/consultation')}>
                <StethoscopeIcon size={18} /> Schedule Doctor Consultation
              </button>
            </div>

            <div>
              <div className="card" style={{ background: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--primary-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-teal)' }}>
                    <StethoscopeIcon size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>Consultation Services</h4>
                    <span className="status-badge">Available Doctor On Duty</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                  Discuss persistent skin issues, receive clinical feedback, and manage ongoing skincare plans with assigned healthcare professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
