// DashboardHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

export default function DashboardHome({ user, faceStatus }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')}>SmartStay</div>
        <ul className="nav-links">
          <li onClick={() => navigate('/hotels')}>Hotels</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => navigate('/contact')}>Contact</li>
          <li onClick={() => navigate('/uploaddocuments')}>Upload Documents</li>
          <li onClick={() => navigate('/profile')}>Profile</li>
        </ul>
        <input className="search-bar" type="text" placeholder="🔍 Search hotels..." />
      </nav>

      <main className="dashboard-content">
        <h2>👋 Welcome, {user?.firstname || 'Guest'}!</h2>

        <section className="status-section">
          <h3>Check-in Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-filled"
              style={{ width: faceStatus?.match ? '100%' : '60%' }}
            ></div>
          </div>
          <p>
            {faceStatus?.match
              ? `✅ Identity Verified (${faceStatus.confidence.toFixed(2)}%)`
              : '🕓 Please complete identity verification in Upload Documents'}
          </p>
        </section>

        <section className="explore-hotels">
          <h3>🛏️ Recommended Hotels</h3>
          <div className="hotel-cards">
            <div className="hotel-card">Hotel Zen - ₹999/night</div>
            <div className="hotel-card">Tranquil Stay - ₹1200/night</div>
            <div className="hotel-card">Eco Inn - ₹850/night</div>
          </div>
        </section>
      </main>
    </div>
  );
}
