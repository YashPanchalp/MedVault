import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SetPass.css';
import axios from "axios";

const SetPass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const stateEmail = location.state?.email;
    const storedEmail = localStorage.getItem("resetEmail");
    const resolvedEmail = stateEmail || storedEmail || '';

    if (!resolvedEmail) {
      navigate('/login');
      return;
    }

    setEmail(resolvedEmail);
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/auth/forgot/reset-password", {
        email,
        password
      });

      localStorage.removeItem("resetEmail");
      alert("Successfully set new password");
      navigate('/login');
    } catch (error) {
      const message = error.response?.data || "Failed to reset password";
      console.error("Reset password failed:", error);
      alert(message);
    }
  };

  return (
    <div className="setpass-container">
      <div className="medical-bg">
        <div className="pulse-circle"></div>
        <div className="pulse-circle"></div>
        <div className="pulse-circle"></div>
      </div>

      <div className="setpass-card">
        <div className="setpass-header">
          <div className="logo-container">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="logo-text">MedVault</h1>
          </div>
          <p className="setpass-subtitle">Create a new password</p>
        </div>

        <form onSubmit={handleSubmit} className="setpass-form">
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 15V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                type="password"
                id="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="16" r="1" fill="currentColor"/>
                </svg>
              </span>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>

          <button type="submit" className="setpass-btn">
            <span>Update Password</span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <div className="setpass-footer">
          <p>
            Back to{' '}
            <button onClick={() => navigate('/login')} className="link-btn">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetPass;
