import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Bed as BedIcon, Plus, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const Beds = () => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchBeds = async () => {
    setLoading(true);
    try {
      const res = await api.get('/beds');
      setBeds(res.data);
    } catch (err) {
      console.error('Failed to fetch beds');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeds();
  }, []);

  const handleSeed = async () => {
    try {
      await api.post('/beds/seed');
      fetchBeds();
    } catch (err) {
      alert('Failed to seed beds');
    }
  };

  const toggleBedStatus = async (id, currentStatus) => {
    setUpdating(id);
    try {
      const patientName = currentStatus ? '' : prompt('Enter Patient Name for this bed:');
      if (!currentStatus && !patientName) {
        setUpdating(null);
        return;
      }
      
      const res = await api.put(`/beds/${id}`, { 
        isOccupied: !currentStatus,
        patientName: patientName || ''
      });
      
      setBeds(beds.map(bed => bed._id === id ? res.data : bed));
    } catch (err) {
      alert('Failed to update bed status');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="header-flex">
        <div className="header-text">
          <h2 className="page-title">Queue & Bed Management</h2>
          <p className="page-subtitle">Real-time occupancy tracking across all departments</p>
        </div>
        <div className="header-actions">
          <button onClick={handleSeed} className="btn btn-outline">
            <Plus size={18} />
            Seed Initial Beds
          </button>
          <button onClick={fetchBeds} className="btn btn-primary">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {loading && beds.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>Loading beds...</div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.5rem', 
          marginTop: '2rem' 
        }}>
          {beds.map((bed) => (
            <div key={bed._id} style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '20px', 
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)',
              transition: 'transform 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Occupancy Indicator */}
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '6px', 
                height: '100%', 
                background: bed.isOccupied ? 'var(--danger)' : 'var(--success)' 
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BedIcon size={24} color={bed.isOccupied ? 'var(--danger)' : 'var(--success)'} />
                  <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>{bed.bedNumber}</span>
                </div>
                <span className={`badge ${bed.isOccupied ? 'badge-purple' : 'badge-green'}`}>
                  {bed.roomType}
                </span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>Status</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  {bed.isOccupied ? (
                    <><XCircle size={16} color="var(--danger)" /> Occupied</>
                  ) : (
                    <><CheckCircle size={16} color="var(--success)" /> Available</>
                  )}
                </div>
              </div>

              {bed.isOccupied && (
                <div style={{ marginBottom: '1.5rem', padding: '10px', background: '#f8fafc', borderRadius: '12px' }}>
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-light)' }}>Current Patient</p>
                  <p style={{ margin: 0, fontWeight: 700 }}>{bed.patientName}</p>
                </div>
              )}

              <button 
                onClick={() => toggleBedStatus(bed._id, bed.isOccupied)}
                disabled={updating === bed._id}
                className="btn"
                style={{ 
                  width: '100%', 
                  justifyContent: 'center',
                  background: bed.isOccupied ? 'transparent' : 'var(--primary)',
                  color: bed.isOccupied ? 'var(--primary)' : 'white',
                  border: bed.isOccupied ? '1px solid var(--primary)' : 'none'
                }}
              >
                {updating === bed._id ? 'Updating...' : (bed.isOccupied ? 'Discharge Patient' : 'Assign Patient')}
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && beds.length === 0 && (
        <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '24px', marginTop: '2rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>No beds found. Click "Seed Initial Beds" to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Beds;
