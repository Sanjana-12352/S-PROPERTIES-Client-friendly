import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import './AdminAuth.css';

const AdminAuth = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ADMIN PASSWORD - Change this to your secure password
  const ADMIN_PASSWORD = 'sanjana@2004'; // Change this!

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Store admin authentication in localStorage
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem('adminAuthTime', new Date().getTime().toString());
        onAuthenticated();
      } else {
        setError('Invalid password. Please try again.');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-header">
          <div className="admin-lock-icon">
            <Lock size={48} />
          </div>
          <h1 className="admin-auth-title">Admin Access</h1>
          <p className="admin-auth-subtitle">Enter password to access admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <div className="admin-form-group">
            <label htmlFor="password" className="admin-label">Password</label>
            <div className="admin-input-wrapper">
              <Lock className="admin-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`admin-input ${error ? 'error' : ''}`}
                placeholder="Enter admin password"
                autoFocus
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <span className="admin-error-text">{error}</span>}
          </div>

          <button type="submit" className="admin-submit-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Access Admin Panel'}
          </button>
        </form>

        <div className="admin-auth-footer">
          <p className="admin-footer-text">
            🔒 This area is restricted to authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;