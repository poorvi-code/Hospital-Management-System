import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { AlertTriangle, ShieldCheck, Activity, Search, Info } from 'lucide-react';

const Triage = () => {
  const [patientName, setPatientName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [triageList, setTriageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchTriage = async () => {
    try {
      const res = await api.get('/triage/list');
      setTriageList(res.data);
    } catch (err) {
      console.error('Failed to fetch triage list');
    }
  };

  useEffect(() => {
    fetchTriage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/triage/assess', { patientName, symptoms });
      setTriageList([res.data, ...triageList]);
      setPatientName('');
      setSymptoms('');
      setMessage({ type: 'success', text: `AI Assessment Complete: ${res.data.priority} priority assigned.` });
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Assessment failed: ' + (err.response?.data?.message || err.message) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="header-flex">
        <div className="header-text">
          <h2 className="page-title">AI Triage System</h2>
          <p className="page-subtitle">Real-time symptom analysis and emergency flagging</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', marginTop: '1.5rem' }}>
        
        {/* Assessment Form */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow-md)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Search size={20} color="var(--primary)" />
            New Assessment
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Patient Full Name</label>
              <input 
                type="text" 
                value={patientName} 
                onChange={(e) => setPatientName(e.target.value)} 
                placeholder="e.g. John Doe"
                required 
              />
            </div>
            <div className="form-group">
              <label>Current Symptoms</label>
              <textarea 
                value={symptoms} 
                onChange={(e) => setSymptoms(e.target.value)} 
                placeholder="Describe symptoms in detail (e.g., severe chest pain, high fever for 2 days)"
                rows="4"
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                required 
              />
            </div>
            <button 
              type="submit" 
              className="btn" 
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading ? 'AI Analyzing...' : 'Run AI Assessment'}
            </button>
          </form>

          {message && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              borderRadius: '12px', 
              background: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
              color: message.type === 'success' ? '#065f46' : '#991b1b',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Info size={18} />
              {message.text}
            </div>
          )}
        </div>

        {/* Priority List */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={20} color="var(--danger)" />
            Live Priority Board
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {triageList.map((item) => (
              <div key={item._id} style={{ 
                padding: '1.25rem', 
                borderRadius: '16px', 
                border: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'between',
                alignItems: 'center',
                background: item.priority === 'Emergency' ? '#fff1f2' : 'white',
                borderColor: item.priority === 'Emergency' ? '#fecdd3' : 'var(--border)'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.patientName}</span>
                    <span className={`badge ${
                      item.priority === 'Emergency' ? 'badge-purple' : 
                      item.priority === 'Urgent' ? 'badge-blue' : 'badge-green'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    <strong>Symptoms:</strong> {item.symptoms}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
                    Recommended: {item.recommendedDepartment}
                  </p>
                </div>
                {item.priority === 'Emergency' && <AlertTriangle color="#e11d48" size={24} style={{ marginLeft: '1rem' }} />}
                {item.priority === 'Routine' && <ShieldCheck color="#10b981" size={24} style={{ marginLeft: '1rem' }} />}
              </div>
            ))}
            {triageList.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '3rem' }}>No assessments yet. Run your first triage check!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Triage;
