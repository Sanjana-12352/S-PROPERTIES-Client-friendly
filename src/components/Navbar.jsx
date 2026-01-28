import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Menu, X, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // For now, we'll use a simple state. Later connect to Firebase Auth
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If on home page, scroll to contact section
      const contactSection = document.querySelector('.contact-page');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other page, navigate to contact route
      navigate('/contact');
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <Home className="logo-icon" />
            <span className="logo-text">S-PROPERTIES</span>
          </Link>
          
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <a href="#properties" className="nav-link">Properties</a>
            <a href="#contact" onClick={handleContactClick} className="nav-link">Contact</a>
            
            {currentUser ? (
              <>
                <Link to="/profile" className="nav-link">
                  <User size={18} /> Profile
                </Link>
                <Link to="/admin" className="nav-link admin-link">
                  🔧 Admin
                </Link>
                <button onClick={handleLogout} className="btn-secondary">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary">Login</Link>
              </>
            )}
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="#properties" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Properties</a>
          <a href="#contact" className="mobile-link" onClick={handleContactClick}>Contact</a>
          
          {currentUser ? (
            <>
              <Link to="/profile" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <Link to="/admin" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
              <button onClick={handleLogout} className="btn-primary mobile-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary mobile-btn" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;