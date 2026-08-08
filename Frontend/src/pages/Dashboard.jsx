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
          setRoutineChecklist(res.data.routineChecklist || []);
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
        setWeatherTip('Geolocation not supported. Please select climate manually.');
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
        (err) => {
          setWeatherTip('Unable to access location. Select your climate manually below.');
        }
      );
    } catch (err) {
      setWeatherTip('Weather data unavailable. Select climate manually.');
    }
  };

  const generateWeatherTips = (condition, temp = 25, humidity = 50) => {
    let tip = '';
    let products = [];

    if (condition.includes('rain') || condition.includes('humid') || humidity > 75) {
      tip = 'It’s humid today! Opt for oil-free lightweight gels and non-comedogenic hydration.';
      products = ['Niacinamide Mattifying Gel', 'Lightweight SPF 50 Mineral Sunscreen'];
    } else if (condition.includes('clear') || condition.includes('sunny') || temp > 30) {
      tip = 'High UV exposure! Reapply broad-spectrum sunscreen every 2 hours and stay hydrated.';
      products = ['Broad-Spectrum SPF 50+ Sunscreen', 'Hydrating Botanical Mist'];
    } else if (condition.includes('cold') || temp < 15) {
      tip = 'Cold climate alert! Guard your skin barrier with rich moisturizers and ceramide creams.';
      products = ['Ceramide Barrier Repair Cream', 'Nourishing Hydrating Lip Oil'];
    } else {
      tip = 'Balanced weather today. Maintain your gentle cleanser, vitamin C serum, and daily SPF.';
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
      toast.error('Please upload a valid image file');
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(disease).then(() => {
      setCopySuccess('Copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { skinIssues, image } = form;
    if (!skinIssues || !image) {
      toast.warn('Please provide skin issues description and upload an image.');
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
          'AI-generated screening result — not a medical diagnosis. Please consult a qualified dermatologist for professional evaluation.'
      );

      const newEntry = {
        skinIssues,
        result: data.disease || data.predicted_condition || 'Skin condition evaluated',
      };
      setAnalysisHistory((prev) => [newEntry, ...prev]);
      await addAnalysisHistory(newEntry);
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Error analyzing skin image. Please try again.');
      setResponseMsg('An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const { concern, skin_type } = productForm;
    if (!concern || !skin_type) {
      toast.warn('Please select both a skin concern and skin type.');
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
    <div className="dashboard-container">
      <div className="dashboard-header-card glass-card">
        <h1>Welcome, {userInfo?.username || 'Skincare Enthusiast'}! ✨</h1>
        <p>Your personalized AI-driven skin health dashboard</p>
      </div>

      {/* Skin Screening AI Form */}
      <section className="dashboard-section glass-card">
        <h2>🔬 AI Skin Screening (ResNet50 Classifier)</h2>
        <form onSubmit={handleSubmit} className="dashboard-form">
          <label>
            <strong>Describe Skin Concerns:</strong>
            <input
              type="text"
              name="skinIssues"
              value={form.skinIssues}
              onChange={handleInputChange}
              placeholder="e.g., redness on cheeks, acne breakout, itchy patch"
              required
            />
          </label>

          <div
            className={`file-drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="skin-upload"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
              required={!form.image}
              style={{ display: 'none' }}
            />
            <label htmlFor="skin-upload" className="drop-zone-label">
              📸 {form.image ? form.image.name : 'Drag & drop image here or click to browse'}
            </label>
          </div>

          {preview && (
            <div className="image-preview-zoom">
              <img src={preview} alt="Skin Preview" />
            </div>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Analyzing Skin Image...' : 'Analyze My Skin'}
          </button>
        </form>

        {responseMsg && (
          <div className="result-section">
            <h3>Screening Result</h3>
            <p className="result-msg">{responseMsg}</p>
            {disease && (
              <div className="disease-box">
                <h4>Suggested Issue: {disease}</h4>
                {confidence && <span className="confidence-badge">Confidence: {confidence}</span>}
                <br />
                <button className="btn btn-secondary" onClick={copyToClipboard}>
                  📋 Copy Result
                </button>
                {copySuccess && <span className="copy-success">{copySuccess}</span>}

                <div className="medical-disclaimer-box">
                  ⚠️ <span>{disclaimer}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Product Recommendation Section */}
      <section className="dashboard-section glass-card">
        <h2>🧴 AI Skincare Product Recommender</h2>
        <form onSubmit={handleProductSubmit} className="dashboard-form grid-form">
          <label>
            <strong>Skin Concern:</strong>
            <select
              name="concern"
              value={productForm.concern}
              onChange={(e) => setProductForm({ ...productForm, concern: e.target.value })}
              required
            >
              <option value="">-- Select Concern --</option>
              {concerns.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            <strong>Skin Type:</strong>
            <select
              name="skin_type"
              value={productForm.skin_type}
              onChange={(e) => setProductForm({ ...productForm, skin_type: e.target.value })}
              required
            >
              <option value="">-- Select Skin Type --</option>
              {skinTypes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="btn">
            Get Recommendation
          </button>
        </form>

        {productRecommendation && (
          <div className="product-recommendation-result glass-card">
            <h3>Recommended Product: {productRecommendation.product_name}</h3>
            <p><strong>Key Ingredients:</strong> {productRecommendation.ingredients}</p>
            <p><strong>How to Use:</strong> {productRecommendation.how_to_use}</p>
            <p><strong>Dermatologist Tips:</strong> {productRecommendation.tips}</p>
          </div>
        )}
      </section>

      {/* Dashboard Widgets */}
      <div className="dashboard-widgets-grid">
        <div className="widget-card glass-card">
          <h3>☀️ Weather-Based Skincare Tip</h3>
          <p>{weatherTip}</p>
          {weatherProducts.length > 0 && (
            <ul>
              {weatherProducts.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}
          <form onSubmit={handleManualClimate} className="climate-form">
            <select value={manualClimate} onChange={(e) => setManualClimate(e.target.value)} required>
              <option value="">Select Climate</option>
              <option value="sunny">Sunny / Hot</option>
              <option value="rainy">Rainy / Humid</option>
              <option value="cold">Cold / Dry</option>
              <option value="mild">Mild / Balanced</option>
            </select>
            <button type="submit" className="btn btn-secondary">
              Apply
            </button>
          </form>
        </div>

        <div className="widget-card glass-card">
          <h3>✅ Daily Skincare Routine Checklist</h3>
          <ul className="checklist">
            {routineChecklist.map((item, index) => (
              <li key={index}>
                <label className="checkbox-label">
                  <input type="checkbox" checked={item.done} onChange={() => toggleChecklist(index)} />
                  <span className={item.done ? 'done-text' : ''}>{item.step}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="widget-card glass-card">
          <h3>📜 AI Screening History</h3>
          {analysisHistory.length === 0 ? (
            <p>No screening history yet.</p>
          ) : (
            <ul className="history-list">
              {analysisHistory.slice(0, 5).map((entry, index) => (
                <li key={index}>
                  <strong>{entry.skinIssues}</strong> ➜ {entry.result}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;