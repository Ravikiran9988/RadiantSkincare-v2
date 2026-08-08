import React from 'react';
import { ScanIcon, ShieldIcon, SparklesIcon, StethoscopeIcon, CheckIcon, LockIcon } from '../components/Icons';

function About() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow">Platform & Architecture</span>
        <h1>Why RadiantSkincare?</h1>
        <p className="subheading" style={{ margin: '0.75rem auto 0' }}>
          Combining computer vision neural networks, targeted formulation algorithms, and real-time telehealth rooms to make dermatological insights accessible and clear.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid-2" style={{ gap: '2rem', marginBottom: '3rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-teal-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-teal)' }}>
              <ScanIcon size={22} />
            </div>
            <h3 style={{ margin: 0 }}>ResNet50 Vision Screening</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
            Our deep learning computer vision model analyzes input facial images, evaluating visual features across 23 dermatological categories. The system outputs confidence evaluations to assist preliminary screening.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-teal-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-teal)' }}>
              <SparklesIcon size={22} />
            </div>
            <h3 style={{ margin: 0 }}>Ingredient Recommendation Engine</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
            Our machine learning recommendation algorithm pairs user skin types and specific concerns with optimal active ingredients (e.g. Salicylic Acid, Niacinamide, Ceramides, Vitamin C) and application protocols.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-teal-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-teal)' }}>
              <StethoscopeIcon size={22} />
            </div>
            <h3 style={{ margin: 0 }}>Real-Time Telehealth Integration</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
            When users require professional healthcare advice, our Socket.IO engine connects patients with dermatologists inside confidential, room-isolated chat environments.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-teal-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-teal)' }}>
              <LockIcon size={22} />
            </div>
            <h3 style={{ margin: 0 }}>Privacy & Data Security</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
            All user data, password hashes, and consultation messages are stored in isolated MongoDB structures using encrypted JWT session handling and path-traversal protected uploads.
          </p>
        </div>
      </div>

      {/* Safety Notice Card */}
      <div id="safety" className="card" style={{ background: 'var(--slate-100)', borderLeft: '4px solid var(--secondary-rose)' }}>
        <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldIcon size={20} style={{ color: 'var(--secondary-rose)' }} /> Medical Safety Notice
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)', margin: 0 }}>
          RadiantSkincare AI tools serve as preliminary screening and educational assistance only. They do not constitute a binding clinical diagnosis. Users are advised to seek professional medical evaluation from licensed healthcare providers for diagnostic assessment and treatment plans.
        </p>
      </div>
    </div>
  );
}

export default About;