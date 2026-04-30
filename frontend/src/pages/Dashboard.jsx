import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, UserRound, CalendarHeart, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'Jan', patients: 65, appointments: 40 },
  { name: 'Feb', patients: 59, appointments: 45 },
  { name: 'Mar', patients: 80, appointments: 65 },
  { name: 'Apr', patients: 81, appointments: 70 },
  { name: 'May', patients: 96, appointments: 85 },
  { name: 'Jun', patients: 110, appointments: 90 },
  { name: 'Jul', patients: 130, appointments: 110 },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
          api.get('/patients'),
          api.get('/doctors'),
          api.get('/appointments')
        ]);
        
        setStats({
          patients: patientsRes.data.length,
          doctors: doctorsRes.data.length,
          appointments: appointmentsRes.data.length
        });

        // Get top 3 most recent appointments
        setRecentAppointments(appointmentsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="animate-fade-up">
      {/* Banner Section */}
      <div style={{ 
        width: '100%', 
        height: '240px', 
        borderRadius: 'var(--radius-xl)', 
        marginBottom: '2rem',
        backgroundImage: 'url(/dashboard_banner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.1) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3rem'
        }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>Welcome to MediCore</h2>
          <p style={{ color: '#e2e8f0', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.6 }}>Your centralized administration panel. Monitor patient admissions, doctor schedules, and key metrics in real-time.</p>
        </div>
      </div>
      
      {/* Stat Cards */}
      <div className="grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={28} strokeWidth={2.5} />
          </div>
          <div className="stat-content">
            <h3>Total Patients</h3>
            <p>{stats.patients}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <UserRound size={28} strokeWidth={2.5} />
          </div>
          <div className="stat-content">
            <h3>Total Doctors</h3>
            <p>{stats.doctors}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
            <CalendarHeart size={28} strokeWidth={2.5} />
          </div>
          <div className="stat-content">
            <h3>Total Appointments</h3>
            <p>{stats.appointments}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {/* Chart Card */}
        <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', gridColumn: '1 / span 2' }}>
          <div className="header-flex" style={{ borderBottom: 'none', marginBottom: '1.5rem', paddingBottom: 0 }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <TrendingUp size={22} color="var(--primary)" />
              Hospital Growth Overview
            </h3>
          </div>
          <div style={{ height: '350px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorAppts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" name="New Patients" />
                <Area type="monotone" dataKey="appointments" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAppts)" name="Appointments" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Appointments Card */}
        <div style={{ padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}>
          <div className="header-flex" style={{ borderBottom: 'none', marginBottom: '1.5rem', paddingBottom: 0 }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <CalendarHeart size={22} color="var(--primary)" />
              Recent Appointments
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {recentAppointments.length > 0 ? recentAppointments.map((apt, index) => (
              <div key={apt._id || index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: index !== recentAppointments.length - 1 ? '1.25rem' : '0', borderBottom: index !== recentAppointments.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--background)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {new Date(apt.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 'bold', lineHeight: 1 }}>
                    {new Date(apt.date).getDate()}
                  </span>
                </div>
                <div>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: '1.05rem' }}>{apt.patient?.name || 'Unknown Patient'}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: '0.2rem 0 0 0' }}>with {apt.doctor?.name || 'Unknown Doctor'}</p>
                  <span className={`badge ${apt.status === 'Completed' ? 'badge-green' : apt.status === 'Cancelled' ? 'badge-purple' : 'badge-blue'}`} style={{ marginTop: '0.5rem', display: 'inline-block', fontSize: '0.75rem' }}>
                    {apt.status}
                  </span>
                </div>
              </div>
            )) : (
              <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem 0' }}>No recent appointments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
