import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/api";
import { toast } from "react-toastify";
import { SparklesIcon } from "./Icons";

const OTPVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast.warn("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({ email, otp });
      toast.success(res.data?.message || "Email verified successfully!");
      navigate("/login");
    } catch (err) {
      console.error("OTP verification error:", err);
      toast.error(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3.5rem 1.5rem 4.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 74px)' }}>
      <div className="card" style={{ maxWidth: '560px', width: '100%', padding: '2.75rem 2.5rem', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
        <span className="eyebrow" style={{ marginBottom: '1rem' }}>
          <SparklesIcon size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
          Email Verification
        </span>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', margin: 0, color: 'var(--dark-text)', fontWeight: 700 }}>
          Verify Email OTP
        </h1>
        <p style={{ color: 'var(--secondary-text)', margin: '0.75rem 0 2rem 0', fontSize: '1rem' }}>
          Enter the 6-digit verification code sent to<br />
          <strong style={{ color: 'var(--dark-text)' }}>{email}</strong>
        </p>

        <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            style={{ textAlign: 'center', letterSpacing: '6px', fontSize: '1.4rem', fontWeight: 700, height: '56px' }}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', height: '54px' }}>
            {loading ? 'Verifying OTP...' : 'Verify Email & Activate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
