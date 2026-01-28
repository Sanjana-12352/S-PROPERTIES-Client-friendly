import React from 'react';
import { Home, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">
              <Home className="footer-logo-icon" />
              <span className="footer-logo-text">S-PROPERTIES</span>
            </div>
            <p className="footer-description">
              Your trusted partner in finding the perfect home.
            </p>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#properties">Properties</a></li>
              <li><a href="#agents">Agents</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#terms">Terms</a></li>
              <li><a href="#privacy">Privacy</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>
                <Phone className="contact-icon" />
                <span>+91 9182624047</span>
              </li>
              <li>
                <Mail className="contact-icon" />
                <span>Maheshreddyduvvuri@s-properties.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 RealEstate. All rights reserved.</p>
          <p>Designed and Developed by Sanjana Reddy Duvvuri</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;