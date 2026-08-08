import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, ShieldIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col" style={{ paddingRight: '1.5rem' }}>
          <Link to="/" className="logo brand-name" style={{ marginBottom: '0.85rem', display: 'inline-flex', color: '#ffffff' }}>
            <SparklesIcon size={20} style={{ color: 'var(--secondary-pink)' }} />
            Radiant<span style={{ color: 'var(--secondary-pink)' }}>Skincare</span>
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#C4B5FD', marginBottom: '1rem', lineHeight: 1.55 }}>
            RadiantSkincare is an AI-powered personalized skincare platform designed to help users understand their skin, discover relevant products, build routines, and track their skincare journey over time.
          </p>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderLeft: '3px solid var(--secondary-pink)',
            padding: '0.6rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: '#E9E4F0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <ShieldIcon size={15} style={{ color: 'var(--secondary-pink)', flexShrink: 0, marginTop: '2px' }} />
            <span>AI-generated screening information is for informational purposes only and is not a medical diagnosis. Consult a healthcare professional for clinical evaluation.</span>
          </div>
        </div>

        {/* Product Navigation */}
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><Link to="/ai-consultation">AI Skin Analysis</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/dashboard">Skin Insights</Link></li>
            <li><Link to="/dashboard">My Routine</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/about#tech">Technology</Link></li>
            <li><Link to="/about#privacy">Privacy</Link></li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div className="footer-col">
          <h4>Legal & Safety</h4>
          <ul>
            <li><span style={{ fontSize: '0.875rem', color: '#C4B5FD' }}>Medical Disclaimer</span></li>
            <li><span style={{ fontSize: '0.875rem', color: '#C4B5FD' }}>Privacy Policy</span></li>
            <li><span style={{ fontSize: '0.875rem', color: '#C4B5FD' }}>Terms of Service</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div>&copy; {new Date().getFullYear()} RadiantSkincare. All rights reserved.</div>
        <div>Personalized AI Skincare Platform</div>
      </div>
    </footer>
  );
};

export default Footer;
