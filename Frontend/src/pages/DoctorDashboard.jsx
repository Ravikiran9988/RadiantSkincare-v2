import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctorProfile, getDoctorConsultations } from '../services/api';
import { toast } from 'react-toastify';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('doctorToken');
    if (!token) {
      navigate('/doctor-login');
      return;
    }

    const loadData = async () => {
      try {
        const profileRes = await getDoctorProfile();
        setDoctor(profileRes.data);

        const consultRes = await getDoctorConsultations();
        setConsultations(consultRes.data || []);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        toast.error('Session expired or invalid doctor token.');
        navigate('/doctor-login');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  if (loading) return <div className="page-container glass-card" style={{ textAlign: 'center' }}>Loading doctor portal...</div>;

  return (
    <div className="page-container">
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h1>Welcome to Your Portal, Dr. {doctor?.name} 🩺</h1>
        <p>Manage your upcoming dermatological patient consultations</p>
      </div>

      {doctor && (
        <div className="glass-card" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
          <img
            src={doctor.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'}
            alt={doctor.name}
            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-teal)' }}
          />
          <div>
            <h2>Dr. {doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Experience:</strong> {doctor.experience}</p>
            <p><strong>Languages:</strong> {Array.isArray(doctor.languages) ? doctor.languages.join(', ') : doctor.languages}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
          </div>
        </div>
      )}

      <div className="glass-card">
        <h3>📋 Assigned Patient Consultations ({consultations.length})</h3>
        {consultations.length === 0 ? (
          <p style={{ marginTop: '1rem', color: '#64748b' }}>No consultations scheduled at the moment.</p>
        ) : (
          <div className="product-grid" style={{ marginTop: '1.5rem' }}>
            {consultations.map((c) => (
              <div key={c._id} className="glass-card">
                <h4>Patient: {c.userName}</h4>
                <p style={{ margin: '0.5rem 0' }}><strong>Concern:</strong> {c.concern}</p>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  <strong>Scheduled Date:</strong> {new Date(c.date).toLocaleString()}
                </p>
                <span className="confidence-badge" style={{ margin: '0.75rem 0' }}>
                  Status: {c.status || 'scheduled'}
                </span>
                <br />
                <button
                  onClick={() => {
                    localStorage.setItem('doctorName', doctor?.name || 'Doctor');
                    navigate(`/chat/${c._id}`);
                  }}
                  className="btn"
                  style={{ marginTop: '0.75rem', width: '100%' }}
                >
                  💬 Start Patient Chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
