import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { CalendarPlus, AlertCircle, CalendarHeart, Trash2, X } from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patient: '', doctor: '', date: '', notes: ''
  });
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [appRes, patRes, docRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/patients'),
        api.get('/doctors')
      ]);
      setAppointments(appRes.data);
      setPatients(patRes.data);
      setDoctors(docRes.data);
      if (patRes.data.length > 0 && docRes.data.length > 0) {
        setFormData(prev => ({
          ...prev, 
          patient: patRes.data[0]._id, 
          doctor: docRes.data[0]._id 
        }));
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', formData);
      setShowModal(false);
      setFormData({ patient: patients[0]?._id || '', doctor: doctors[0]?._id || '', date: '', notes: '' });
      fetchData();
    } catch (err) {
      setError('Failed to book appointment');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await api.delete(`/appointments/${id}`);
        fetchData();
      } catch (err) {
        setError('Failed to delete appointment');
      }
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="header-flex">
        <div className="header-text">
          <h2 className="page-title">Appointments</h2>
          <p className="page-subtitle">Schedule and view patient appointments</p>
        </div>
        <button className="btn" onClick={() => setShowModal(true)}>
          <CalendarPlus size={18} />
          Book Appointment
        </button>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment._id}>
                <td style={{ fontWeight: 500 }}>
                  <div style={{ color: 'var(--text)' }}>{new Date(appointment.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
                  <div style={{ color: 'var(--primary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{new Date(appointment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </td>
                <td style={{ fontWeight: 500 }}>{appointment.patient?.name || 'Unknown Patient'}</td>
                <td>{appointment.doctor?.name || 'Unknown Doctor'}</td>
                <td>
                  <span className={`badge ${appointment.status === 'Completed' ? 'badge-green' : appointment.status === 'Cancelled' ? 'badge-purple' : 'badge-blue'}`}>
                    {appointment.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-light)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {appointment.notes || '-'}
                </td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '0.4rem 0.6rem', border: 'none', color: 'var(--danger)' }} onClick={() => handleDelete(appointment._id)} title="Cancel Appointment">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <CalendarHeart size={48} />
                    <p>No appointments scheduled yet.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Book Appointment</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Patient</label>
                <select name="patient" value={formData.patient} onChange={handleInputChange} required>
                  {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Select Doctor</label>
                <select name="doctor" value={formData.doctor} onChange={handleInputChange} required>
                  {doctors.map(d => <option key={d._id} value={d._id}>{d.name} ({d.specialization})</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Date & Time</label>
                <input type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Notes (Optional)</label>
                <input type="text" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Reason for visit" />
              </div>
              <div className="action-buttons">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn">Book Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
