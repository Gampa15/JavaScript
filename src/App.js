import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'; 
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UploadDocuments from './pages/UploadDocuments';
import DashboardHome from './pages/DashboardHome';

export default function App() {
  const [user, setUser] = useState(null);
  const [faceStatus, setFaceStatus] = useState({ match: false, confidence: 0 });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<DashboardHome user={user} faceStatus={faceStatus} />} />
        <Route path="/uploaddocuments" element={<UploadDocuments onUploadComplete={(match, confidence) => setFaceStatus({ match, confidence })} />} />
        <Route path="/hotels" element={<div><h2>Hotel Booking Page 🏨</h2><p>Coming soon...</p></div>} />
        <Route path="/about" element={<div><h2>About Us</h2><p>Learn more about SmartStay.</p></div>} />
        <Route path="/contact" element={<div><h2>Contact Us</h2><p>Email us at support@smartstay.com</p></div>} />
        <Route path="/profile" element={<div><h2>Your Profile</h2><p>Update your preferences and settings.</p></div>} />
      </Routes>
    </Router>
  );
}

