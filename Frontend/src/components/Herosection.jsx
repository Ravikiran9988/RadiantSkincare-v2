import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartConsultation = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      localStorage.setItem("redirectAfterLogin", "/dashboard");
      navigate("/login");
    }
  };

  const handleDoctorConsultation = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/consultation");
    } else {
      localStorage.setItem("redirectAfterLogin", "/consultation");
      navigate("/login");
    }
  };

  return (
    <div className="page-container">
      <header className="glass-card" style={{ textAlign: "center", padding: "4rem 2rem", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3.25rem", marginBottom: "1.25rem", background: "linear-gradient(135deg, #0d9488, #f43f5e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Glow with AI Intelligence ✨
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#475569", maxWidth: "720px", margin: "0 auto 2.5rem" }}>
          Next-generation ResNet50 skin screening, machine learning product recommendations, and real-time certified dermatologist consultations.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          <button className="btn" onClick={handleStartConsultation} style={{ fontSize: "1.1rem", padding: "1rem 2.25rem" }}>
            🔬 Start AI Skin Analysis
          </button>
          <button className="btn btn-secondary" onClick={handleDoctorConsultation} style={{ fontSize: "1.1rem", padding: "1rem 2.25rem" }}>
            👨‍⚕️ Schedule Doctor Chat
          </button>
        </div>

        <div className="medical-disclaimer-box" style={{ maxWidth: "750px", margin: "2.5rem auto 0", textAlign: "center" }}>
          🛡️ <strong>Certified Quality & Safety:</strong> AI predictions are intended as screening assistance only, not binding medical diagnoses.
        </div>
      </header>

      {/* Feature Highlight Cards */}
      <div className="product-grid">
        <div className="glass-card">
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📸</div>
          <h3>ResNet50 Vision Screening</h3>
          <p>Instant computer vision analysis classifying 23 common skin conditions with confidence scores.</p>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🧪</div>
          <h3>Ingredient Matching Engine</h3>
          <p>Scikit-learn recommendation model matching your skin type and specific concerns to ideal formulations.</p>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💬</div>
          <h3>Live Doctor Telehealth</h3>
          <p>Real-time Socket.IO encrypted messaging with board-certified dermatologists.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
