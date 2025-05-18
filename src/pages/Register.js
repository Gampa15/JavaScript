import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EyeIcon from '../components/EyeIcon';
import Confetti from 'react-confetti';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
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
    const { firstName, lastName, email, password } = form;

    if (!firstName || !lastName || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Registration failed');
      } else {
        toast.success('Registered successfully!');
        setForm({ firstName: '', lastName: '', email: '', password: '' });
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          navigate('/login');
        }, 3000);
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
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
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

        <button type="submit">✨ Register</button>
        <p>
          Already have an account?{' '}
          <span className="link" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
