import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="hero-container">
        {/* REALISTIC HIGH-RESOLUTION WEB IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
          alt="Modern Hospital Hallway"
          className="hero-bg"
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1 className="hero-title">
            Smarter <span style={{ color: '#3b82f6', fontStyle: 'italic' }}>Healthcare</span><br />
            starts here
          </h1>

          <p className="hero-subtitle">
            The intelligent operating system for modern hospitals.
            Automate triage, manage beds, and save lives with MediCore.
          </p>

          <div className="hero-btn-container">
            <button onClick={() => navigate('/register')} className="hero-btn">
              Get Started Now
              <ChevronRight size={24} style={{ display: 'inline', marginLeft: '8px' }} />
            </button>

            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="login-link">
              Already have an account? Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
