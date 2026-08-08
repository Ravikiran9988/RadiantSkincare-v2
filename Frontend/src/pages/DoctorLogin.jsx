import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorLogin } from '../services/api';
import { toast } from 'react-toastify';

const DoctorLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await doctorLogin(form);
      const data = res.data;

      localStorage.setItem('doctorToken', data.token);
      localStorage.setItem('doctorName', data.doctor?.name || 'Doctor');
      localStorage.setItem('isDoctorLoggedIn', 'true');

      window.dispatchEvent(new Event('profileUpdated'));
      toast.success(`Welcome back, Dr. ${data.doctor?.name || ''}!`);

      navigate('/doctor/dashboard');
    } catch (err) {
      console.error('Doctor Login error:', err);
      const errMsg = err.response?.data?.message || 'Invalid doctor credentials.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>🩺 Doctor Portal Login</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '1.5rem' }}>Sign in to access patient consultation rooms</p>

        {error && <div className="medical-disclaimer-box" style={{ margin: '0 0 1.5rem 0' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <strong>Doctor Email:</strong>
            <input
              type="email"
              name="email"
              placeholder="doctor@radiantskin.in"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <strong>Password:</strong>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  padding: '4px',
                  boxShadow: 'none',
                  fontSize: '0.85rem'
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <button type="submit" className="btn" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Authenticating Doctor...' : 'Login as Doctor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
