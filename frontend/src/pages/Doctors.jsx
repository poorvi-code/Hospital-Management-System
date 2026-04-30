import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, X, AlertCircle, UserRound, Phone, Stethoscope, CheckCircle, XCircle } from 'lucide-react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', specialization: '', contact: ''
  });
  const [error, setError] = useState('');

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors');
      setDoctors(res.data);
    } catch (err) {
      setError('Failed to fetch doctors');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/doctors', formData);
      setShowModal(false);
      setFormData({ name: '', specialization: '', contact: '' });
      fetchDoctors();
    } catch (err) {
      setError('Failed to add doctor');
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="header-flex">
        <div className="header-text">
          <h2 className="page-title">Doctors Directory</h2>
          <p className="page-subtitle">Manage healthcare professionals</p>
        </div>
        <button className="btn" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add New Doctor
        </button>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid">
        {doctors.map(doctor => (
          <div key={doctor._id} className="stat-card" style={{ padding: '1.5rem', alignItems: 'flex-start', gap: '1rem', flexDirection: 'column' }}>
            <div className="flex-center" style={{ gap: '1rem', width: '100%' }}>
              <div className="stat-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', width: '50px', height: '50px' }}>
                <Stethoscope size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', margin: 0 }}>{doctor.name}</h3>
                <p style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500 }}>{doctor.specialization}</p>
              </div>
            </div>
            
            <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="flex-center" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                <Phone size={16} />
                <span>{doctor.contact}</span>
              </div>
              <div className="flex-center" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                {doctor.availability ? (
                  <><CheckCircle size={16} color="var(--success)" /><span style={{ color: 'var(--success)' }}>Currently Available</span></>
                ) : (
                  <><XCircle size={16} color="var(--danger)" /><span style={{ color: 'var(--danger)' }}>Unavailable</span></>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {doctors.length === 0 && (
        <div className="empty-state">
          <UserRound size={48} />
          <p>No doctors found. Add a doctor to build your directory.</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Doctor</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Doctor's Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Jane Doe" />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} required placeholder="e.g. Cardiologist" />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required placeholder="+1 (555) 000-0000" />
              </div>
              <div className="action-buttons">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn">Add Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
