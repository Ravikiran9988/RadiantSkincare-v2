import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctorProfile, getDoctorConsultations } from '../services/api';
import { toast } from 'react-toastify';
import { StethoscopeIcon, ChatIcon, UserIcon, CalendarIcon } from '../components/Icons';
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

  if (loading) return <div className="page-container" style={{ textAlign: 'center', padding: '5rem 0' }}>Loading doctor portal...</div>;

  return (
    <div className="page-container">
      {/* Doctor Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="eyebrow">Healthcare Portal</span>
        <h1>Welcome, Dr. {doctor?.name}</h1>
        <p style={{ color: 'var(--slate-600)' }}>Manage assigned patient consultations and telehealth channels</p>
      </div>

      {/* Doctor Info Card */}
      {doctor && (
        <div className="card" style={{ marginBottom: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--light-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-purple)', flexShrink: 0 }}>
            <StethoscopeIcon size={40} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Dr. {doctor.name}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', margin: 0 }}>
              <strong>Specialization:</strong> {doctor.specialization} • <strong>Experience:</strong> {doctor.experience}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>
              <strong>Languages:</strong> {Array.isArray(doctor.languages) ? doctor.languages.join(', ') : doctor.languages} • <strong>Email:</strong> {doctor.email}
            </p>
          </div>
        </div>
      )}

      {/* Patient Consultations Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--slate-200)' }}>
          <h3 style={{ margin: 0 }}>Assigned Patient Consultations ({consultations.length})</h3>
          <span className="status-badge">Active Sessions</span>
        </div>

        {consultations.length === 0 ? (
          <p style={{ color: 'var(--slate-500)', textAlign: 'center', padding: '2rem 0' }}>
            No patient consultations scheduled at the moment.
          </p>
        ) : (
          <div className="grid-3">
            {consultations.map((c) => (
              <div key={c._id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                      Patient: {c.userName}
                    </span>
                    <span className="status-badge" style={{ fontSize: '0.75rem' }}>{c.status || 'scheduled'}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '0.5rem' }}>
                    <strong>Concern:</strong> {c.concern}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                    <CalendarIcon size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                    {new Date(c.date).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => {
                    localStorage.setItem('doctorName', doctor?.name || 'Doctor');
                    navigate(`/chat/${c._id}`);
                  }}
                  className="btn btn-primary"
                  style={{ marginTop: '1.25rem', width: '100%', fontSize: '0.85rem', padding: '0.6rem' }}
                >
                  <ChatIcon size={16} /> Open Patient Chat
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
