import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Triage from './pages/Triage';
import Beds from './pages/Beds';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();
  
  // Hide the Dashboard Navbar on the Landing page
  const showNavbar = location.pathname !== '/';

  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "main-content" : ""}>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Management Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
          <Route path="/doctors" element={<PrivateRoute><Doctors /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
          <Route path="/triage" element={<PrivateRoute><Triage /></PrivateRoute>} />
          <Route path="/beds" element={<PrivateRoute><Beds /></PrivateRoute>} />

          {/* Redirect old home to dashboard */}
          <Route path="/home" element={<Navigate to="/dashboard" />} />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
