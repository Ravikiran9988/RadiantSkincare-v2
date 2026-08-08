import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorLogin } from '../services/api';
import { toast } from 'react-toastify';
import { StethoscopeIcon, ShieldIcon } from '../components/Icons';

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
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="eyebrow">
            <StethoscopeIcon size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            Healthcare Portal
          </span>
          <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Doctor Login</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginTop: '0.35rem' }}>Sign in to access patient consultation rooms</p>
        </div>

        {error && (
          <div className="medical-disclaimer-box" style={{ marginBottom: '1.25rem' }}>
            <ShieldIcon size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label>Doctor Email Address:</label>
            <input
              type="email"
              name="email"
              placeholder="doctor@radiantskin.in"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password:</label>
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
                  color: 'var(--slate-500)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem', width: '100%' }}>
            {loading ? 'Authenticating...' : 'Login as Doctor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
