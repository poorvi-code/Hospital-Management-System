import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Activity, LayoutDashboard, Users, UserRound, CalendarHeart, LogOut, LogIn, Bed } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <div className="brand-icon">
          <Activity size={24} strokeWidth={2.5} />
        </div>
        <h1>MediCore</h1>
      </NavLink>

      <div className="nav-links">
        {user ? (
          <>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              <div className="flex-center">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </NavLink>

            {/* Doctors, Nurses, and Admins can see Patients */}
            {['admin', 'doctor', 'nurse'].includes(user.role) && (
              <NavLink to="/patients" className={({ isActive }) => isActive ? "active" : ""}>
                <div className="flex-center">
                  <Users size={18} />
                  <span>Patients</span>
                </div>
              </NavLink>
            )}

            {/* Only Admins can manage Doctors */}
            {user.role === 'admin' && (
              <NavLink to="/doctors" className={({ isActive }) => isActive ? "active" : ""}>
                <div className="flex-center">
                  <UserRound size={18} />
                  <span>Doctors</span>
                </div>
              </NavLink>
            )}

            <NavLink to="/appointments" className={({ isActive }) => isActive ? "active" : ""}>
              <div className="flex-center">
                <CalendarHeart size={18} />
                <span>Appointments</span>
              </div>
            </NavLink>

            <NavLink to="/triage" className={({ isActive }) => isActive ? "active" : ""}>
              <div className="flex-center">
                <Activity size={18} />
                <span>AI Triage</span>
              </div>
            </NavLink>

            <NavLink to="/beds" className={({ isActive }) => isActive ? "active" : ""}>
              <div className="flex-center">
                <Bed size={18} />
                <span>Beds</span>
              </div>
            </NavLink>

            <button onClick={handleLogout} className="btn btn-outline" style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <NavLink to="/login" className="btn">
            <LogIn size={18} />
            <span>Login</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
