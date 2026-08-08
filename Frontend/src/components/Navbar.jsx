import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/api';
import { SparklesIcon, MenuIcon, CloseIcon, UserIcon, LogoutIcon } from './Icons';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const res = await getCurrentUser();
        if (res.data && res.data.username) {
          setUser(res.data);
          return;
        }
      }
      setUser(null);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile();

    const handleStorageChange = () => fetchProfile();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdated', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo with Natural Word Spacing */}
        <Link to="/" className="logo brand-name">
          <SparklesIcon size={20} style={{ color: 'var(--primary-purple)' }} />
          <span>Radiant</span>
          <span style={{ color: 'var(--primary-purple)' }}>Skincare</span>
        </Link>

        {/* Public Navigation Links */}
        <nav className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/ai-consultation" className={location.pathname === '/ai-consultation' ? 'active' : ''}>AI Analysis</Link>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Skin Insights</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>

          {/* Mobile Actions */}
          {mobileOpen && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {user ? (
                <>
                  <button className="btn btn-secondary navbar-user-btn" onClick={() => navigate('/dashboard')}>
                    <UserIcon size={16} /> Dashboard ({user.username})
                  </button>
                  <button className="btn btn-secondary navbar-user-btn" onClick={handleLogout}>
                    <LogoutIcon size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary">Login</Link>
                  <Link to="/register" className="btn btn-primary">Get Started</Link>
                </>
              )}
            </div>
          )}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="nav-buttons">
          {user ? (
            <>
              <button className="btn btn-secondary navbar-user-btn" onClick={() => navigate('/dashboard')}>
                <UserIcon size={16} /> {user.username}
              </button>
              <button className="btn btn-secondary navbar-user-btn" onClick={handleLogout} title="Logout" style={{ padding: '0 0.85rem' }}>
                <LogoutIcon size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={{ display: 'inline-flex' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Hamburger Toggle */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
            {mobileOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
