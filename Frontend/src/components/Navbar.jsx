import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, getDoctorProfile } from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    const doctorToken = localStorage.getItem('doctorToken');

    try {
      if (token) {
        const res = await getCurrentUser();
        if (res.data && res.data.username) {
          setUser(res.data);
          setDoctor(null);
          return;
        }
      }

      if (doctorToken) {
        const res = await getDoctorProfile();
        if (res.data && res.data.name) {
          setDoctor(res.data);
          setUser(null);
          return;
        }
      }

      setUser(null);
      setDoctor(null);
    } catch (err) {
      setUser(null);
      setDoctor(null);
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

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setDoctor(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo brand-name">
          Radiant<span>Skincare</span>
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/ai-consultation">AI Screening</Link>
          <Link to="/consultation">Doctor Chat</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>

          <div className="nav-buttons" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user ? (
              <>
                <span
                  style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--primary-teal-dark)' }}
                  onClick={() => navigate('/dashboard')}
                >
                  Welcome, {user.username}
                </span>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : doctor ? (
              <>
                <span
                  style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--accent-indigo)' }}
                  onClick={() => navigate('/doctor/dashboard')}
                >
                  Dr. {doctor.name}
                </span>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
