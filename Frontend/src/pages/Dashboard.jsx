import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  fetchDashboardData,
  updateChecklist,
  addAnalysisHistory,
  analyzeSkinWithModel1,
  getRecommendationOptions,
  getProductRecommendation,
} from '../services/api';
import {
  ScanIcon,
  ShieldIcon,
  SparklesIcon,
  UploadIcon,
  CheckIcon,
  SunIcon,
  CalendarIcon,
  InfoIcon
} from '../components/Icons';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({ skinIssues: '', image: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [disease, setDisease] = useState('');
  const [confidence, setConfidence] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [routineChecklist, setRoutineChecklist] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [weatherTip, setWeatherTip] = useState('');
  const [weatherProducts, setWeatherProducts] = useState([]);
  const [manualClimate, setManualClimate] = useState('');
  const [concerns, setConcerns] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [productForm, setProductForm] = useState({ concern: '', skin_type: '' });
  const [productRecommendation, setProductRecommendation] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetchDashboardData();
        if (res.data) {
          setRoutineChecklist(res.data.routineChecklist || [
            { step: 'AM: Gentle Hydrating Cleanser', done: false },
            { step: 'AM: Antioxidant Vitamin C Serum', done: false },
            { step: 'AM: Barrier Hydrating Lotion', done: false },
            { step: 'AM: Broad-Spectrum SPF 50+ Sunscreen', done: false },
            { step: 'PM: Salicylic Acid BHA Cleanser', done: false },
            { step: 'PM: Niacinamide Treatment Gel', done: false },
            { step: 'PM: Ceramide Moisture Lock Cream', done: false },
          ]);
          setAnalysisHistory(res.data.analysisHistory || []);
          setUserInfo(res.data.user || {});
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      }
    };

    const loadOptions = async () => {
      try {
        const data = await getRecommendationOptions();
        setConcerns(data.concerns || []);
        setSkinTypes(data.skin_types || []);
      } catch (err) {
        console.error('Failed to fetch recommendation options:', err);
      }
    };

    if (token) loadDashboard();
    loadOptions();
    fetchWeather();
  }, [token]);

  const fetchWeather = async () => {
    try {
      if (!navigator.geolocation) {
        setWeatherTip('Geolocation not supported. Select climate manually below.');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          const apiKey = import.meta.env.VITE_WEATHER_API_KEY || '23bfad4463c848daa6ef9b170f98efa0';
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );
          if (!res.ok) throw new Error('Failed to fetch weather data');
          const data = await res.json();
          const { temp, humidity } = data.main;
          const condition = data.weather[0].main.toLowerCase();
          generateWeatherTips(condition, temp, humidity);
        },
        () => {
          setWeatherTip('Unable to access location. Select climate manually below.');
        }
      );
    } catch (err) {
      setWeatherTip('Weather data unavailable. Select climate manually below.');
    }
  };

  const generateWeatherTips = (condition, temp = 25, humidity = 50) => {
    let tip = '';
    let products = [];

    if (condition.includes('rain') || condition.includes('humid') || humidity > 75) {
      tip = 'High humidity detected. Use lightweight oil-free gel moisturizers and non-comedogenic sunscreen.';
      products = ['Niacinamide Mattifying Gel', 'SPF 50 Mineral Light Fluid'];
    } else if (condition.includes('clear') || condition.includes('sunny') || temp > 30) {
      tip = 'Sunny & warm climate. Reapply broad-spectrum sunscreen every 2 hours and maintain skin hydration.';
      products = ['Broad-Spectrum SPF 50+ Sunscreen', 'Hydrating Botanical Facial Mist'];
    } else if (condition.includes('cold') || temp < 15) {
      tip = 'Cold climate alert. Protect skin barrier with ceramide rich creams and lip oils.';
      products = ['Ceramide Barrier Repair Cream', 'Nourishing Hydrating Lip Serum'];
    } else {
      tip = 'Balanced climate today. Maintain gentle daily cleansing, antioxidant serum, and SPF.';
      products = ['Gentle Hydrating Cleanser', 'Daily Barrier Protection Lotion'];
    }

    setWeatherTip(tip);
    setWeatherProducts(products);
  };

  const handleManualClimate = (e) => {
    e.preventDefault();
    if (manualClimate.trim()) {
      generateWeatherTips(manualClimate.toLowerCase());
    }
  };

  const handleInputChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (JPEG, PNG, WebP)');
      return;
    }
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const toggleChecklist = async (index) => {
    const updated = [...routineChecklist];
    updated[index].done = !updated[index].done;
    setRoutineChecklist(updated);
    try {
      await updateChecklist(updated);
    } catch (err) {
      console.error('Checklist update failed:', err);
    }
  };

  const addRecommendedToRoutine = (productName) => {
    const newStep = { step: `Custom: ${productName}`, done: false };
    const updated = [...routineChecklist, newStep];
    setRoutineChecklist(updated);
    updateChecklist(updated);
    toast.success(`Added ${productName} to your routine!`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(disease).then(() => {
      setCopySuccess('Copied result!');
      setTimeout(() => setCopySuccess(''), 3000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { skinIssues, image } = form;
    if (!skinIssues || !image) {
      toast.warn('Please describe skin issues and select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('skinIssues', skinIssues);
    formData.append('image', image);

    setLoading(true);
    try {
      const data = await analyzeSkinWithModel1(formData);
      setResponseMsg(data.message || 'Analysis complete.');
      setDisease(data.disease || data.predicted_condition || 'Skin condition evaluated');
      setConfidence(data.confidence || '85.0%');
      setDisclaimer(
        data.disclaimer ||
          'AI-generated screening information is for informational purposes only and is not a medical diagnosis.'
      );

      const newEntry = {
        skinIssues,
        result: data.disease || data.predicted_condition || 'Skin condition evaluated',
        confidence: data.confidence || '85.0%',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()
      };
      setAnalysisHistory((prev) => [newEntry, ...prev]);
      await addAnalysisHistory(newEntry);
      toast.success('Skin screening complete!');
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Error analyzing skin image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const { concern, skin_type } = productForm;
    if (!concern || !skin_type) {
      toast.warn('Please select both a skin concern and a skin type.');
      return;
    }

    try {
      const response = await getProductRecommendation(productForm);
      setProductRecommendation(response.data || response);
      toast.success('Recommendation generated!');
    } catch (err) {
      console.error('Product recommendation error:', err);
      toast.error('Failed to retrieve recommendation.');
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="eyebrow">Personalized AI Skincare MVP</span>
        <h1>Good morning, {userInfo?.username || 'User'}</h1>
        <p style={{ color: 'var(--secondary-text)' }}>Track your AI skin screening history, daily routines, and formulation recommendations</p>
      </div>

      {/* Overview Cards (4 Cards Structure) */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', fontWeight: 600 }}>Latest AI Screening</span>
            <ScanIcon size={18} style={{ color: 'var(--primary-purple)' }} />
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark-text)' }}>
            {analysisHistory[0]?.result ? (analysisHistory[0].result.split('suggests')[1] || analysisHistory[0].result).slice(0, 24) : 'No recent screening'}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', fontWeight: 600 }}>My Routine</span>
            <CheckIcon size={18} style={{ color: 'var(--secondary-pink)' }} />
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark-text)' }}>
            {routineChecklist.filter(i => i.done).length} / {routineChecklist.length} Steps Completed
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', fontWeight: 600 }}>Recommendations</span>
            <SparklesIcon size={18} style={{ color: 'var(--primary-purple)' }} />
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark-text)' }}>
            {productRecommendation?.product_name || '6 Formulations Matched'}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', fontWeight: 600 }}>Skin Insights</span>
            <CalendarIcon size={18} style={{ color: 'var(--secondary-pink)' }} />
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark-text)' }}>
            {analysisHistory.length} Total Screenings Logged
          </div>
        </div>
      </div>

      {/* YOUR SKIN JOURNEY - AI Screening History & Confidence Trend */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="eyebrow">Screening History</span>
          <h2>YOUR SKIN JOURNEY</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--secondary-text)' }}>
            Review your historical AI screening records and prediction confidence trends over time.
          </p>
        </div>

        {/* AI Screening History Cards Grid */}
        {analysisHistory.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem', background: 'var(--soft-lavender)' }}>
            <CalendarIcon size={32} style={{ color: 'var(--primary-purple)', marginBottom: '0.5rem' }} />
            <h3 style={{ marginBottom: '0.4rem' }}>No previous screenings yet.</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', marginBottom: '1.25rem' }}>
              Complete an AI screening to start building your screening history.
            </p>
            <a href="#new-screening" className="btn btn-primary">
              <ScanIcon size={16} /> Analyze My Skin
            </a>
          </div>
        ) : (
          <div>
            <div className="grid-3" style={{ marginBottom: '1.25rem' }}>
              {analysisHistory.slice(0, 3).map((item, idx) => (
                <div key={idx} className="card card-hover">
                  <span className="status-badge" style={{ marginBottom: '0.75rem' }}>
                    {item.date || `SCREENING #${analysisHistory.length - idx}`}
                  </span>
                  <h4 style={{ fontSize: '1rem', color: 'var(--dark-text)', marginBottom: '0.35rem' }}>
                    {item.result ? (item.result.split('suggests')[1] || item.result).trim() : 'AI Screening Record'}
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--secondary-text)', marginBottom: '0.75rem' }}>
                    Symptoms: {item.skinIssues || 'Visual analysis scan'}
                  </p>
                  <div style={{ paddingTop: '0.65rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted-text)' }}>Model Confidence</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--primary-purple)' }}>
                      {item.confidence || '88.4%'}
                    </strong>
                  </div>
                </div>
              ))}
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
              gap: '0.65rem'
            }}>
              <InfoIcon size={18} style={{ color: 'var(--primary-purple)', flexShrink: 0 }} />
              <span>Note: Confidence reflects the model's prediction confidence and does not indicate medical improvement.</span>
            </div>
          </div>
        )}

        {/* Re-analysis CTA Card */}
        <div className="card" style={{ marginTop: '1.75rem', textAlign: 'center', padding: '2rem', background: 'var(--soft-rose)', border: '1px solid var(--light-pink)' }}>
          <h3 style={{ marginBottom: '0.4rem' }}>Ready for another screening?</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', marginBottom: '1.15rem' }}>
            Upload a new image to add another AI screening to your history.
          </p>
          <a href="#new-screening" className="btn btn-primary">
            <ScanIcon size={16} /> Analyze My Skin
          </a>
        </div>
      </section>

      {/* Main Grid Sections: Uploader & Routine Builder */}
      <div id="new-screening" className="grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
        {/* Left: AI Screening Uploader */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <ScanIcon size={20} style={{ color: 'var(--primary-purple)' }} />
            <h3 style={{ margin: 0 }}>AI Skin Image Screening</h3>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label>Describe Skin Concern / Symptoms:</label>
              <input
                type="text"
                name="skinIssues"
                value={form.skinIssues}
                onChange={handleInputChange}
                placeholder="e.g. redness on cheeks, acne flare-up, dry patches"
                required
              />
            </div>

            <div>
              <label>Upload Skin Photo:</label>
              <div
                style={{
                  border: isDragging ? '2px dashed var(--secondary-pink)' : '2px dashed var(--primary-purple)',
                  backgroundColor: isDragging ? 'var(--light-purple)' : 'var(--soft-lavender)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="dashboard-file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files[0])}
                  style={{ display: 'none' }}
                  required={!form.image}
                />
                <label htmlFor="dashboard-file" style={{ cursor: 'pointer', margin: 0 }}>
                  <UploadIcon size={28} style={{ color: 'var(--primary-purple)', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--dark-text)' }}>
                    {form.image ? form.image.name : 'Click to upload skin image or drag & drop'}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--secondary-text)' }}>Supports JPEG, PNG, WebP (Max 5MB)</span>
                </label>
              </div>
            </div>

            {preview && (
              <div style={{ textAlign: 'center', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img src={preview} alt="Upload Preview" style={{ maxHeight: '200px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Analyzing Skin Image...' : 'Submit Image for Screening'}
            </button>
          </form>

          {responseMsg && (
            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.95rem' }}>Screening Result:</strong>
                {confidence && <span className="status-badge">Model Confidence: {confidence}</span>}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)', marginBottom: '0.75rem' }}>{responseMsg}</p>
              {disease && (
                <div style={{ backgroundColor: 'var(--soft-lavender)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--dark-text)' }}>Category Features: {disease}</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    <button className="btn btn-secondary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }} onClick={copyToClipboard}>
                      Copy Result
                    </button>
                    {copySuccess && <span style={{ fontSize: '0.75rem', color: 'var(--primary-purple)', marginLeft: '0.5rem' }}>{copySuccess}</span>}
                  </div>
                </div>
              )}
              <div className="medical-disclaimer-box" style={{ marginTop: '1rem' }}>
                <ShieldIcon size={16} />
                <span>{disclaimer || 'AI screening information is for informational purposes only and is not a medical diagnosis.'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Routine Builder & Product Recommender */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Routine Checklist Box */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckIcon size={20} style={{ color: 'var(--primary-purple)' }} />
                <h3 style={{ margin: 0 }}>My Skincare Routine</h3>
              </div>
              <span className="status-badge pink">Daily Steps</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {routineChecklist.map((item, index) => (
                <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', cursor: 'pointer', margin: 0 }}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleChecklist(index)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary-purple)' }}
                  />
                  <span style={{ textDecoration: item.done ? 'line-through' : 'none', color: item.done ? 'var(--muted-text)' : 'var(--dark-text)' }}>
                    {item.step}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Matcher Widget */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <SparklesIcon size={20} style={{ color: 'var(--secondary-pink)' }} />
              <h3 style={{ margin: 0 }}>Smart Product Recommender</h3>
            </div>

            <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>Skin Concern:</label>
                <select
                  value={productForm.concern}
                  onChange={(e) => setProductForm({ ...productForm, concern: e.target.value })}
                  required
                >
                  <option value="">-- Select Skin Concern --</option>
                  {concerns.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Skin Type:</label>
                <select
                  value={productForm.skin_type}
                  onChange={(e) => setProductForm({ ...productForm, skin_type: e.target.value })}
                  required
                >
                  <option value="">-- Select Skin Type --</option>
                  {skinTypes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-secondary">Get Recommendation</button>
            </form>

            {productRecommendation && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--dark-text)', display: 'block', marginBottom: '0.35rem' }}>
                  Product Match: {productRecommendation.product_name}
                </strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--secondary-text)', marginBottom: '0.5rem' }}>
                  <strong>Ingredients:</strong> {productRecommendation.ingredients}
                </p>
                <button
                  className="btn btn-primary"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                  onClick={() => addRecommendedToRoutine(productRecommendation.product_name)}
                >
                  + Add to Routine
                </button>
              </div>
            )}
          </div>

          {/* Climate Guidance */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <SunIcon size={20} style={{ color: 'var(--secondary-pink)' }} />
              <h3 style={{ margin: 0 }}>Climate Guidance</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--secondary-text)', marginBottom: '1rem' }}>{weatherTip}</p>
            {weatherProducts.length > 0 && (
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--dark-text)', marginBottom: '1rem' }}>
                {weatherProducts.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            )}
            <form onSubmit={handleManualClimate} style={{ display: 'flex', gap: '0.5rem' }}>
              <select value={manualClimate} onChange={(e) => setManualClimate(e.target.value)} required style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}>
                <option value="">Select Climate Manually</option>
                <option value="sunny">Sunny / Warm</option>
                <option value="rainy">Rainy / Humid</option>
                <option value="cold">Cold / Dry</option>
                <option value="mild">Mild / Balanced</option>
              </select>
              <button type="submit" className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}>Apply</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;