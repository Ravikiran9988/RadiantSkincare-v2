import React, { useState, useEffect } from 'react';
import { scheduleConsultation, getDoctors } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StethoscopeIcon, CalendarIcon, CheckIcon, ShieldIcon } from '../components/Icons';

const Consultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [concern, setConcern] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorsList = async () => {
      try {
        const res = await getDoctors();
        setDoctors(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load doctors list:', err);
      }
    };
    fetchDoctorsList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      toast.warn('Please select both a date and time.');
      return;
    }

    setLoading(true);
    try {
      const dateTime = `${date}T${time}`;
      const res = await scheduleConsultation({
        dateTime,
        concern,
        doctorId: selectedDoctorId || undefined,
      });

      const doctor = res.data?.doctor;
      const consultationId = res.data?.consultationId || doctor?.name;
      toast.success(`Consultation booked with Dr. ${doctor?.name || 'Assigned Specialist'}!`);

      navigate(`/chat/${consultationId}`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Booking consultation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="eyebrow">
          <StethoscopeIcon size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
          Dermatology Appointments
        </span>
        <h1>Schedule a Dermatologist Consultation</h1>
        <p className="subheading" style={{ margin: '0.5rem auto 0' }}>
          Connect with a dermatologist for confidential real-time medical evaluation and personalized skincare guidance.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
        {/* Left Column: Form Card */}
        <div className="card">
          <h3 style={{ marginBottom: '1.25rem' }}>Appointment Details</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label>Select Dermatologist (Optional):</label>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
              >
                <option value="">-- Auto-assign Available Doctor --</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.title || 'Dr.'} {doc.name} — {doc.specialization} ({doc.experience})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Primary Skin Concern / Symptoms:</label>
              <input
                type="text"
                placeholder="e.g., Persistent redness, scalp irritation, severe breakouts"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
              />
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div>
                <label>Appointment Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <label>Preferred Time:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '0.5rem' }}>
              <CalendarIcon size={18} /> {loading ? 'Booking Appointment...' : 'Schedule Consultation'}
            </button>
          </form>
        </div>

        {/* Right Column: Available Doctors Overview */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Available Doctors ({doctors.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {doctors.map((doc) => (
                <div
                  key={doc._id}
                  style={{
                    padding: '1rem',
                    border: selectedDoctorId === doc._id ? '2px solid var(--primary-teal)' : '1px solid var(--slate-200)',
                    backgroundColor: selectedDoctorId === doc._id ? 'var(--primary-teal-wash)' : '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setSelectedDoctorId(doc._id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--slate-900)' }}>
                        {doc.title || 'Dr.'} {doc.name}
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--slate-600)', display: 'block' }}>
                        {doc.specialization} • {doc.experience} exp
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                        Languages: {Array.isArray(doc.languages) ? doc.languages.join(', ') : doc.languages}
                      </span>
                    </div>
                    <span className="status-badge" style={{ fontSize: '0.7rem' }}>Available</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="medical-disclaimer-box">
            <ShieldIcon size={18} />
            <span>Consultations are conducted in encrypted rooms. Your personal data is confidential and protected.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
