import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, ShieldIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Description */}
        <div className="footer-col" style={{ paddingRight: '2rem' }}>
          <Link to="/" className="logo brand-name" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <SparklesIcon size={20} className="logo-icon" />
            Radiant<span>Skincare</span>
          </Link>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            RadiantSkincare is an AI-powered personalized skincare platform combining deep learning vision models, ingredient recommendation algorithms, and real-time telehealth consultations.
          </p>
          <div className="medical-disclaimer-box" style={{ fontSize: '0.8rem', padding: '0.65rem 0.85rem' }}>
            <ShieldIcon size={16} />
            <span>AI results are for informational screening purposes and are not a medical diagnosis.</span>
          </div>
        </div>

        {/* Product Navigation */}
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><Link to="/ai-consultation">AI Skin Screening</Link></li>
            <li><Link to="/products">Product Recommender</Link></li>
            <li><Link to="/consultation">Doctor Consultations</Link></li>
            <li><Link to="/dashboard">User Dashboard</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Technology</Link></li>
            <li><Link to="/about#privacy">Privacy Safeguards</Link></li>
            <li><Link to="/about#safety">Medical Safety Notice</Link></li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div className="footer-col">
          <h4>Legal & Safety</h4>
          <ul>
            <li><span style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>Medical Disclaimer</span></li>
            <li><span style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>Privacy Policy</span></li>
            <li><span style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>Terms of Service</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div>&copy; {new Date().getFullYear()} RadiantSkincare. All rights reserved.</div>
        <div>Personalized AI Skincare & Telehealth Platform</div>
      </div>
    </footer>
  );
};

export default Footer;
