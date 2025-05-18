import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');

    try {
      const res = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log('Server error:', data);
        toast.error(data.message || 'Failed to send reset link');
      } else {
        toast.success('Reset link sent to your email');
      }
    } catch {
      toast.error('Server error');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
        <p className="text-center mt-4">
          <span className="link" onClick={() => window.history.back()}>
            Back to Login
          </span>
        </p>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
