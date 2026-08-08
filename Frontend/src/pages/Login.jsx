import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { toast } from 'react-toastify';
import { SparklesIcon, ShieldIcon } from '../components/Icons';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(form);
      const data = res.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.user?.username || data.user?.email || form.email);

        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new Event('profileUpdated'));
        toast.success('Welcome back!');

        const redirect = localStorage.getItem('redirectAfterLogin') || '/dashboard';
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirect);
      }
    } catch (err) {
      console.error('Login error:', err);
      const errMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2.5rem 1rem 3.5rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div className="card" style={{ maxWidth: '460px', width: '100%', padding: '36px 40px', margin: '2.5rem auto 0', borderRadius: '20px' }}>
        {/* Full Width Heading & Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>
            <SparklesIcon size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            User Authentication
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)', margin: 0, color: 'var(--dark-text)', fontWeight: 700, lineHeight: 1.25 }}>
            Sign in to Radiant Skincare
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--secondary-text)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Access your personalized skincare dashboard
          </p>
        </div>

        {error && (
          <div className="medical-disclaimer-box" style={{ marginBottom: '1.25rem' }}>
            <ShieldIcon size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Compact Form Container */}
        <form onSubmit={handleSubmit} style={{ maxWidth: '380px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '8px', display: 'block' }}>
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              style={{ height: '52px', borderRadius: '12px', padding: '0 16px' }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '8px', display: 'block' }}>
              Password:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                style={{ height: '52px', borderRadius: '12px', padding: '0 16px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-purple)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.35rem', width: '100%', height: '52px', borderRadius: '12px' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.9rem' }}>
          <p style={{ color: 'var(--secondary-text)', margin: 0 }}>
            New to Radiant Skincare?{' '}
            <Link to="/register" style={{ color: 'var(--primary-purple)', fontWeight: 600, textDecoration: 'none' }}>
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
