import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";
import { toast } from "react-toastify";
import { SparklesIcon } from "../components/Icons";

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
    <div style={{ padding: '2.5rem 1rem 3.5rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '36px 40px', margin: '2.5rem auto 0', borderRadius: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>
            <SparklesIcon size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            New Account Registration
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)', margin: 0, color: 'var(--dark-text)', fontWeight: 700, lineHeight: 1.25 }}>
            Create your Radiant Skincare account
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--secondary-text)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Get started with AI-powered personalized skincare insights
          </p>
        </div>

        <form onSubmit={sendOTP} style={{ maxWidth: '400px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '8px', display: 'block' }}>
              Username:
            </label>
            <input
              type="text"
              name="username"
              placeholder="Pick a username"
              value={formData.username}
              onChange={handleChange}
              style={{ height: '52px', borderRadius: '12px', padding: '0 16px' }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '8px', display: 'block' }}>
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleChange}
              style={{ height: '52px', borderRadius: '12px', padding: '0 16px' }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--dark-text)', marginBottom: '8px', display: 'block' }}>
              Password:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Choose a strong password"
                value={formData.password}
                onChange={handleChange}
                style={{ height: '52px', borderRadius: '12px', padding: '0 16px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-purple)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.35rem', width: '100%', height: '52px', borderRadius: '12px' }}>
            {loading ? 'Sending OTP...' : 'Send Verification OTP'}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.9rem' }}>
          <p style={{ color: 'var(--secondary-text)', margin: 0 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-purple)', fontWeight: 600, textDecoration: 'none' }}>
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterWithOTP;
