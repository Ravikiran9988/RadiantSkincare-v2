import React from 'react';
import { ScanIcon, ShieldIcon, SparklesIcon, CalendarIcon, LockIcon } from '../components/Icons';

function About() {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="eyebrow">
          <SparklesIcon size={14} style={{ color: 'var(--primary-purple)' }} />
          Platform & Architecture
        </span>
        <h1>Why RadiantSkincare?</h1>
        <p className="subheading" style={{ margin: '0.75rem auto 0' }}>
          RadiantSkincare is an AI-powered personalized skincare platform designed to help users understand their skin, discover relevant skincare products, build routines, and track their skincare journey over time.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid-2" style={{ gap: '2rem', marginBottom: '3rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--light-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-purple)' }}>
              <ScanIcon size={22} />
            </div>
            <h3 style={{ margin: 0 }}>ResNet50 Vision Screening</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', lineHeight: 1.6 }}>
            Our deep learning computer vision model analyzes input facial images, evaluating visual features across 23 dermatological categories. The system outputs confidence evaluations to assist preliminary screening.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--light-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-pink)' }}>
              <SparklesIcon size={22} />
            </div>
            <h3 style={{ margin: 0 }}>Ingredient Recommendation Engine</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', lineHeight: 1.6 }}>
            Our machine learning recommendation algorithm pairs user skin types and specific concerns with optimal active ingredients (e.g. Salicylic Acid, Niacinamide, Ceramides, Vitamin C) and application protocols.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--light-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-purple)' }}>
              <CalendarIcon size={22} />
            </div>
            <h3 style={{ margin: 0 }}>Personalized Routine & Tracking</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', lineHeight: 1.6 }}>
            Users can build morning and evening skincare routines, log daily step completion, and track screening progress trends across recurring AI analysis check-ins.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--light-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-pink)' }}>
              <LockIcon size={22} />
            </div>
            <h3 style={{ margin: 0 }}>Privacy & Data Security</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--secondary-text)', lineHeight: 1.6 }}>
            All user profiles, password hashes, and screening histories are stored in isolated MongoDB structures using encrypted JWT session handling and path-traversal protected uploads.
          </p>
        </div>
      </div>

      {/* Safety Notice Card */}
      <div id="safety" className="card" style={{ background: 'var(--soft-rose)', borderLeft: '4px solid var(--secondary-pink)' }}>
        <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldIcon size={20} style={{ color: 'var(--secondary-pink)' }} /> Medical Safety Notice
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)', margin: 0 }}>
          AI-generated screening information is for informational purposes only and is not a medical diagnosis. If you have a persistent, severe, or concerning skin issue, consult a qualified healthcare professional.
        </p>
      </div>
    </div>
  );
}

export default About;