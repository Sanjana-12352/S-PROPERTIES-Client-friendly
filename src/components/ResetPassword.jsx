import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import './ResetPassword.css';

const ResetPassword = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      // Send password reset email via Firebase
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      console.error('Reset password error:', error);
      
      if (error.code === 'auth/user-not-found') {
        setErrors({ submit: 'No account found with this email.' });
      } else if (error.code === 'auth/invalid-email') {
        setErrors({ submit: 'Invalid email address.' });
      } else {
        setErrors({ submit: 'Failed to send reset email. Please try again.' });
      }
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="success-icon">✓</div>
          <h2 className="auth-title">Check Your Email</h2>
          <p className="auth-subtitle">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="reset-instructions">
            Click the link in the email to reset your password. If you don't see it, check your spam folder.
          </p>
          <button onClick={onSwitchToLogin} className="back-to-login-btn">
            <ArrowLeft size={20} />
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your email to receive a reset link</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <button onClick={onSwitchToLogin} className="back-link">
          <ArrowLeft size={16} />
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;