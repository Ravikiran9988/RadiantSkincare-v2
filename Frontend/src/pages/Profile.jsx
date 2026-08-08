import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrentUser, updateProfile as apiUpdateProfile, changePassword as apiChangePassword } from '../services/api';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [profile, setProfile] = useState({ username: '', email: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getCurrentUser();
        if (res.data) {
          setProfile({
            username: res.data.username || '',
            email: res.data.email || '',
          });
        }
      } catch (err) {
        console.error('Fetch profile error:', err);
        toast.error('Error loading profile information');
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiUpdateProfile(profile);
      toast.success(res.data?.message || 'Profile updated successfully!');
      window.dispatchEvent(new Event('profileUpdated'));
    } catch (err) {
      console.error('Update profile error:', err);
      toast.error(err.response?.data?.message || 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword) {
      toast.warn('Please fill out both current and new password fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiChangePassword(passwords);
      toast.success(res.data?.message || 'Password changed successfully!');
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (err) {
      console.error('Password error:', err);
      toast.error(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="glass-card" style={{ maxWidth: '650px', margin: '0 auto' }}>
        <h2>👤 Account Settings & Profile</h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Manage your personal details and account credentials</p>

        <form onSubmit={handleUpdateProfile} className="dashboard-form" style={{ marginBottom: '2rem' }}>
          <h3>Personal Details</h3>
          <label>
            <strong>Username:</strong>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
              required
            />
          </label>
          <label>
            <strong>Email Address:</strong>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              required
            />
          </label>
          <button type="submit" className="btn" disabled={loading}>
            Update Information
          </button>
        </form>

        <form onSubmit={handleChangePassword} className="dashboard-form">
          <h3>Security & Password</h3>
          <label>
            <strong>Current Password:</strong>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <label>
            <strong>New Password:</strong>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <button type="submit" className="btn btn-secondary" disabled={loading}>
            Change Password
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
