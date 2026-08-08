import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { toast } from 'react-toastify';

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
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Sign In to RadiantSkincare ✨</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '1.5rem' }}>Access your personalized skincare dashboard</p>

        {error && <div className="medical-disclaimer-box" style={{ margin: '0 0 1.5rem 0' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <strong>Email Address:</strong>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
          <p>
            New to RadiantSkincare?{' '}
            <Link to="/register" style={{ color: 'var(--primary-teal-dark)', fontWeight: 600 }}>
              Register Here
            </Link>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            Are you a licensed doctor?{' '}
            <Link to="/doctor-login" style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>
              Doctor Portal Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
