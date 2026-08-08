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
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="eyebrow">
            <SparklesIcon size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            User Account
          </span>
          <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Sign in to RadiantSkincare</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginTop: '0.35rem' }}>Access your personalized skin health dashboard</p>
        </div>

        {error && (
          <div className="medical-disclaimer-box" style={{ marginBottom: '1.25rem' }}>
            <ShieldIcon size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label>Email Address:</label>
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.875rem' }}>
          <p>
            New to RadiantSkincare?{' '}
            <Link to="/register" style={{ color: 'var(--primary-purple)', fontWeight: 600, textDecoration: 'none' }}>
              Register Here
            </Link>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            Are you a doctor?{' '}
            <Link to="/doctor-login" style={{ color: 'var(--dark-text)', fontWeight: 600, textDecoration: 'none' }}>
              Doctor Portal Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
