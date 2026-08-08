import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/api";
import { toast } from "react-toastify";

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
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem', textAlign: 'center' }}>
        <h2>Verify Email OTP 🔑</h2>
        <p style={{ color: '#64748b', margin: '0.5rem 0 1.5rem 0' }}>
          Enter the 6-digit verification code sent to<br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="e.g. 123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.25rem', fontWeight: 'bold' }}
            required
          />
          <button type="submit" className="btn" disabled={loading} style={{ width: '100%', marginTop: '1.5rem' }}>
            {loading ? 'Verifying OTP...' : 'Verify Email & Activate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
