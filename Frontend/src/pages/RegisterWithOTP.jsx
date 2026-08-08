import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { toast } from "react-toastify";

const RegisterWithOTP = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await register(formData);
      toast.success(res.data?.message || "Verification OTP sent to your email!");
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      console.error("OTP Send Error:", err);
      toast.error(err.response?.data?.message || "Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Create Account ✨</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '1.5rem' }}>Get started with AI-powered skincare insights</p>

        <form onSubmit={sendOTP}>
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <strong>Username:</strong>
            <input
              type="text"
              name="username"
              placeholder="Pick a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <strong>Email Address:</strong>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={formData.email}
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
                placeholder="Choose a strong password"
                value={formData.password}
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
            {loading ? 'Sending OTP...' : 'Send Email OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterWithOTP;
