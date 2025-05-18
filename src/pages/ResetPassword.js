import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import EyeIcon from '../components/EyeIcon';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const { password, confirmPassword } = form;

    if (!password || !confirmPassword) {
      return toast.error('Both fields are required');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      const res = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Reset failed');
      } else {
        toast.success('Password reset successful!');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch {
      toast.error('Server error');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset Your Password</h2>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
          />
          <EyeIcon visible={showPassword} onClick={() => setShowPassword(!showPassword)} />
        </div>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <EyeIcon visible={showPassword} onClick={() => setShowPassword(!showPassword)} />
        </div>
        <button type="submit">🔐 Reset Password</button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
