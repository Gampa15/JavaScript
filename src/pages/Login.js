import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EyeIcon from '../components/EyeIcon';
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      toast.error('Please fill in both fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Login failed');
      } else {
        toast.success('Login successful!');
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          navigate('/dashboard');
        }, 2500);
      }
    } catch {
      toast.error('Server error');
    }
  };

  return (
    <div className="auth-container">
      {showConfetti && <Confetti />}
      <button className="dark-mode-toggle" onClick={toggleDark}>
        {darkMode ? '☀ Light' : '🌙 Dark'}
      </button>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-header">
          <img src="/logo192.png" alt="Logo" />
          <h2>SmartStay</h2>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <EyeIcon visible={showPassword} onClick={togglePassword} />
        </div>

        <button type="submit">🚀 Login</button>
        <p className="text-right text-sm mt-2 mb-4">
           <span className="link" onClick={() => navigate('/forgot-password')}>
              Forgot password?
           </span>
        </p>
        <p>
          Don’t have an account?{' '}
          <span className="link" onClick={() => navigate('/register')}>Register</span>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
