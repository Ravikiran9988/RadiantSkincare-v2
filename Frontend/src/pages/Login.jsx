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
    <div style={{ padding: '3.5rem 1.5rem 4.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 74px)' }}>
      <div className="card" style={{ maxWidth: '560px', width: '100%', padding: '2.75rem 2.5rem', borderRadius: 'var(--radius-lg)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem' }}>
            <SparklesIcon size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            User Authentication
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', margin: 0, color: 'var(--dark-text)', fontWeight: 700 }}>
            Sign in to RadiantSkincare
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--secondary-text)', marginTop: '0.75rem' }}>
            Access your personalized skincare dashboard
          </p>
        </div>

        {error && (
          <div className="medical-disclaimer-box" style={{ marginBottom: '1.5rem' }}>
            <ShieldIcon size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
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

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem', width: '100%', height: '54px' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.95rem' }}>
          <p style={{ color: 'var(--secondary-text)', margin: 0 }}>
            New to RadiantSkincare?{' '}
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
