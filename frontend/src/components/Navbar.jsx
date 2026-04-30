import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, Users, UserRound, CalendarHeart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <div className="brand-icon">
          <Activity size={24} strokeWidth={2.5} />
        </div>
        <h1>MediCore</h1>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          <div className="flex-center">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </div>
        </NavLink>
        <NavLink to="/patients" className={({ isActive }) => isActive ? "active" : ""}>
          <div className="flex-center">
            <Users size={18} />
            <span>Patients</span>
          </div>
        </NavLink>
        <NavLink to="/doctors" className={({ isActive }) => isActive ? "active" : ""}>
          <div className="flex-center">
            <UserRound size={18} />
            <span>Doctors</span>
          </div>
        </NavLink>
        <NavLink to="/appointments" className={({ isActive }) => isActive ? "active" : ""}>
          <div className="flex-center">
            <CalendarHeart size={18} />
            <span>Appointments</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
