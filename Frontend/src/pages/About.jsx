import React from 'react';

function About() {
  return (
    <div className="page-container">
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>About RadiantSkincare ✨</h1>
        <p style={{ maxWidth: '750px', margin: '0 auto 2rem', fontSize: '1.1rem', color: '#475569' }}>
          RadiantSkincare combines state-of-the-art computer vision (ResNet50), machine learning product recommendation algorithms, and real-time board-certified dermatologist consultations into a unified, secure platform.
        </p>

        <div className="product-grid" style={{ marginTop: '3rem', textAlign: 'left' }}>
          <div className="glass-card">
            <h3>🔬 ResNet50 Classifier</h3>
            <p>Our deep learning vision model classifies 23 distinct dermatological conditions to provide rapid screening assistance.</p>
          </div>

          <div className="glass-card">
            <h3>🧴 ML Product Recommender</h3>
            <p>Tailored ingredient matching algorithms recommend optimal serums, moisturizers, and treatments based on your skin type and specific concerns.</p>
          </div>

          <div className="glass-card">
            <h3>👨‍⚕️ Verified Dermatologists</h3>
            <p>Seamless real-time Socket.IO chat connects users with licensed doctors for professional medical evaluation and personalized prescriptions.</p>
          </div>

          <div className="glass-card">
            <h3>🛡️ Privacy & Safety</h3>
            <p>HIPAA-aligned data isolation, encrypted JWT authentication, safe image handling, and strict medical safety disclaimers prioritize user trust.</p>
          </div>
        </div>

        <div className="medical-disclaimer-box" style={{ marginTop: '3rem', textAlign: 'center' }}>
          ⚠️ <strong>Medical Notice:</strong> RadiantSkincare AI tools serve as preliminary screening and educational assistance only. They do not constitute a binding clinical diagnosis. Always consult a licensed healthcare professional for medical conditions.
        </div>
      </div>
    </div>
  );
}

export default About;