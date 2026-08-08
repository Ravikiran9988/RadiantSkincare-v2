import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeroSection from '../components/Herosection.jsx';
import {
  ScanIcon,
  ShieldIcon,
  StethoscopeIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon
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

      {/* 2. Compact Trust Section (Purple/Pink Icons, Accurate Claims) */}
      <section style={{ backgroundColor: 'var(--soft-lavender)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '2rem 0' }}>
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
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>Encrypted session handling</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <SparklesIcon size={22} style={{ color: 'var(--primary-purple)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--dark-text)' }}>Personalized Recommendations</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>Targeted active ingredients</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <StethoscopeIcon size={22} style={{ color: 'var(--secondary-pink)' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--dark-text)' }}>Dermatologist Consultation</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>Real-time telehealth rooms</span>
              </div>
            </div>
          </div>

          <div className="medical-disclaimer-box" style={{ marginTop: '1.5rem' }}>
            <ShieldIcon size={18} />
            <span>AI results are for informational screening purposes and are not a medical diagnosis. Consult a dermatologist for clinical evaluation.</span>
          </div>
        </div>
      </section>

      {/* 3. Feature Section: Everything you need for better skincare */}
      <section className="page-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="eyebrow">Comprehensive Platform</span>
          <h2>Everything you need for better skincare.</h2>
          <p className="subheading" style={{ margin: '0.75rem auto 0' }}>
            From AI-assisted screening to personalized recommendations and professional consultation.
          </p>
        </div>

        <div className="grid-3">
          {/* Card 01: Purple */}
          <div className="card card-hover">
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--light-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-purple)', marginBottom: '1.25rem' }}>
              <ScanIcon size={22} />
            </div>
            <h3>AI Skin Screening</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Analyze your skin with our ResNet50-based computer vision model for preliminary feature evaluations.
            </p>
          </div>

          {/* Card 02: Pink */}
          <div className="card card-hover">
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--light-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-pink)', marginBottom: '1.25rem' }}>
              <SparklesIcon size={22} />
            </div>
            <h3>Personalized Recommendations</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Discover formulations and active ingredients optimized for your exact skin type and concerns.
            </p>
          </div>

          {/* Card 03: Purple */}
          <div className="card card-hover">
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--light-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-purple)', marginBottom: '1.25rem' }}>
              <StethoscopeIcon size={22} />
            </div>
            <h3>Dermatologist Consultation</h3>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Connect with a dermatologist through confidential, encrypted real-time consultation rooms.
            </p>
          </div>
        </div>
      </section>

      {/* 4. How Radiant Works (3-Step Section) */}
      <section style={{ backgroundColor: 'var(--soft-rose)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '4.5rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow">Simple Workflow</span>
            <h2>How Radiant works</h2>
            <p className="subheading" style={{ margin: '0.5rem auto 0' }}>
              Three straightforward steps to understanding and supporting your skin health.
            </p>
          </div>

          <div className="grid-3">
            <div className="step-card">
              <span className="step-number step-1">01</span>
              <h3>Analyze</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Upload a clear image of your skin and describe any symptoms or specific areas of concern.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number step-2">02</span>
              <h3>Understand</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                AI-assisted screening evaluates image patterns and identifies potential skin concern categories.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number step-3">03</span>
              <h3>Improve</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Explore personalized product recommendations or schedule a direct consultation with a doctor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI Technology Section (Dark #1E1633 Container) */}
      <section className="dark-section" style={{ padding: '5rem 0' }}>
        <div className="page-container" style={{ padding: '0 1.5rem' }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="eyebrow" style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: 'var(--secondary-pink)' }}>
                Rigorous Neural Network
              </span>
              <h2 style={{ marginBottom: '1.25rem', color: '#ffffff' }}>AI that helps you understand your skin.</h2>
              <p style={{ color: '#C4B5FD', marginBottom: '1.75rem', fontSize: '1rem', lineHeight: 1.65 }}>
                Our deep learning architecture combines ResNet50 computer vision feature extraction with machine learning recommendation models. AI-assisted screening evaluates image patterns to output confidence metrics and guide your skincare journey.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size={18} style={{ color: 'var(--secondary-pink)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#E9E4F0' }}><strong>Pattern Recognition:</strong> Evaluates visual features across 23 dermatological categories.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size={18} style={{ color: 'var(--primary-purple)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#E9E4F0' }}><strong>Confidence Evaluation:</strong> Computes probability distribution percentages.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size={18} style={{ color: 'var(--secondary-pink)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#E9E4F0' }}><strong>Targeted Formulations:</strong> Matches skin concerns with optimal active ingredients.</span>
                </div>
              </div>
            </div>

            <div className="dark-card">
              <h3 style={{ color: '#ffffff', marginBottom: '1.25rem' }}>Screening Model Capabilities</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.65rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#E9E4F0' }}>Acne & Rosacea Features</span>
                  <span className="status-badge">ResNet50 Vision</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.65rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#E9E4F0' }}>Eczema & Dermatitis Screening</span>
                  <span className="status-badge">ResNet50 Vision</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.65rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#E9E4F0' }}>Pigmentation & Texture Disorders</span>
                  <span className="status-badge">ResNet50 Vision</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#E9E4F0' }}>Scikit-learn Product Matcher</span>
                  <span className="status-badge pink">ML Recommender</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Product Recommendation Section */}
      <section className="page-container" style={{ padding: '4.5rem 1.5rem' }}>
        <div className="grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Smart Product Engine</span>
            <h2 style={{ marginBottom: '1rem' }}>Recommendations built around your skin.</h2>
            <p className="subheading" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
              Our recommendation engine matches skin type and concerns with relevant skincare formulations, active ingredient breakdowns, and application tips.
            </p>
            <Link to="/products" className="btn btn-primary">
              View Recommendations <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1.25rem' }}>Recommendation Generator</h3>
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
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--dark-text)' }}>Recommended: {recommendation.product_name}</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', marginTop: '0.25rem' }}>
                  <strong>Ingredients:</strong> {recommendation.ingredients}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Dermatologist Section */}
      <section className="page-container" style={{ padding: '0 1.5rem 4.5rem' }}>
        <div className="card" style={{ padding: '3.5rem 2.5rem', background: 'linear-gradient(135deg, #ffffff 0%, var(--soft-lavender) 100%)', border: '1px solid var(--light-purple)' }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '2.5rem' }}>
            <div>
              <span className="eyebrow">Expert Healthcare Access</span>
              <h2 style={{ marginBottom: '1rem' }}>Professional guidance when you need it.</h2>
              <p className="subheading" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                Schedule confidential appointments and communicate through encrypted real-time chat rooms with assigned dermatologists.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/consultation')}>
                <StethoscopeIcon size={18} /> Talk to a Dermatologist
              </button>
            </div>

            <div>
              <div className="card" style={{ background: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--light-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-purple)' }}>
                    <StethoscopeIcon size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>Clinical Consultations</h4>
                    <span className="status-badge pink">Available Specialist</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--secondary-text)' }}>
                  Discuss persistent skin concerns, receive medical feedback, and follow personalized treatment protocols.
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
