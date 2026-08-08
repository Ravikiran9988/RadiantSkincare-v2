import React, { useState, useEffect } from 'react';
import { scheduleConsultation, getDoctors } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
      <div className="glass-card" style={{ maxWidth: '650px', margin: '0 auto' }}>
        <h2>📅 Schedule a Dermatologist Consultation</h2>
        <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
          Connect with a board-certified dermatologist for confidential real-time advice.
        </p>

        <form onSubmit={handleSubmit} className="dashboard-form">
          <label>
            <strong>Select Dermatologist (Optional):</strong>
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
          </label>

          <label>
            <strong>Primary Skin Concern / Symptoms:</strong>
            <input
              type="text"
              placeholder="e.g., Persistent rash, acne evaluation, scalp irritation"
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <label>
              <strong>Date:</strong>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </label>

            <label>
              <strong>Time:</strong>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </label>
          </div>

          <button type="submit" className="btn" disabled={loading} style={{ marginTop: '1.5rem', width: '100%' }}>
            {loading ? 'Booking Appointment...' : 'Schedule Consultation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Consultation;
