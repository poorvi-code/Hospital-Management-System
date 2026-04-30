import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Edit2, Trash2, X, AlertCircle, Users } from 'lucide-react';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', contact: '', address: '', medicalHistory: ''
  });
  const [error, setError] = useState('');

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients');
      setPatients(res.data);
    } catch (err) {
      setError('Failed to fetch patients');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (patient = null) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData(patient);
    } else {
      setEditingPatient(null);
      setFormData({ name: '', age: '', gender: 'Male', contact: '', address: '', medicalHistory: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPatient) {
        await api.put(`/patients/${editingPatient._id}`, formData);
      } else {
        await api.post('/patients', formData);
      }
      setShowModal(false);
      fetchPatients();
    } catch (err) {
      setError('Failed to save patient');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await api.delete(`/patients/${id}`);
        fetchPatients();
      } catch (err) {
        setError('Failed to delete patient');
      }
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="header-flex">
        <div className="header-text">
          <h2 className="page-title">Patients Management</h2>
          <p className="page-subtitle">View and manage all patient records</p>
        </div>
        <button className="btn" onClick={() => openModal()}>
          <Plus size={18} />
          Add New Patient
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
              <th>Name</th>
              <th>Age/Gender</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient._id}>
                <td style={{ fontWeight: 500 }}>{patient.name}</td>
                <td>
                  <span className={`badge ${patient.gender === 'Male' ? 'badge-blue' : patient.gender === 'Female' ? 'badge-purple' : 'badge-green'}`}>
                    {patient.age} Y / {patient.gender}
                  </span>
                </td>
                <td>{patient.contact}</td>
                <td style={{ color: 'var(--text-light)' }}>{patient.address}</td>
                <td>
                  <div className="flex-center" style={{ gap: '0.75rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.4rem 0.6rem', border: 'none' }} onClick={() => openModal(patient)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-outline" style={{ padding: '0.4rem 0.6rem', border: 'none', color: 'var(--danger)' }} onClick={() => handleDelete(patient._id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <Users size={48} />
                    <p>No patients found. Add your first patient to get started.</p>
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
              <h3>{editingPatient ? 'Edit Patient Details' : 'Add New Patient'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter patient name" />
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} required placeholder="Years" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required placeholder="+1 (555) 000-0000" />
              </div>
              <div className="form-group">
                <label>Residential Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required placeholder="Full address" />
              </div>
              <div className="form-group">
                <label>Medical History (Optional)</label>
                <input type="text" name="medicalHistory" value={formData.medicalHistory} onChange={handleInputChange} placeholder="Any known conditions or allergies" />
              </div>
              <div className="action-buttons">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn">{editingPatient ? 'Update Patient' : 'Save Patient'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
