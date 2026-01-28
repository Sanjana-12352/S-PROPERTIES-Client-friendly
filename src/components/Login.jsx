import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import './Login.css';

const Login = ({ onSwitchToSignup, onSwitchToReset, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      // Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      window.location.href = '/'; // Redirect to home
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        setErrors({ submit: 'No account found with this email.' });
      } else if (error.code === 'auth/wrong-password') {
        setErrors({ submit: 'Incorrect password. Please try again.' });
      } else if (error.code === 'auth/invalid-email') {
        setErrors({ submit: 'Invalid email address.' });
      } else {
        setErrors({ submit: 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account</p>
        
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

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-footer">
            <button
              type="button"
              className="forgot-password"
              onClick={onSwitchToReset}
            >
              Forgot Password?
            </button>
          </div>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          <p>Don't have an account?{' '}
            <button onClick={onSwitchToSignup} className="switch-btn">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;