import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CTASection.css';

const CTASection = () => {
  const PHONE_NUMBER="9182624047"
  const EMAIL='Maheshreddyduvvuri@s-properties.com'
  const WHATSAPP_NUMBER='9182624047'
  const navigate = useNavigate();
  const handleWhatsAppClick=()=>{
    const message =encodeURIComponent('Hello! I would like to inquire about properties.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  }

  return (
    <div className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Your Dream Home is One Step Away</h2>
          <p className="cta-subtitle">
            Ready to find your perfect property? Our expert team is here to help you every step of the way.
          </p>
          
          <div className="cta-cards">
            <div className="cta-card">
              <div className="cta-icon-wrapper">
                <Phone className="cta-icon" />
              </div>
              <h3 className="cta-card-title">Call Us</h3>
              <p className="cta-card-text">Speak with our agents</p>
              <a href="tel:+91" className="cta-link">
                +91 9182624047
              </a>
            </div>

            <div className="cta-card">
              <div className="cta-icon-wrapper">
                <Mail className="cta-icon" />
              </div>
              <h3 className="cta-card-title">Email Us</h3>
              <p className="cta-card-text">Get a quick response</p>
              <a href="mailto:Maheshreddyduvvuri@s-properties.com" className="cta-link">
                Maheshreddyduvvuri@s-properties.com
              </a>
            </div>

            <div className="cta-card">
              <div className="cta-icon-wrapper">
                <MessageCircle className="cta-icon" />
              </div>
              <h3 className="cta-card-title">WhatsApp Us</h3>
              <p className="cta-card-text">Chat instantly</p>
              <button 
                onClick={handleWhatsAppClick}
                className="cta-button"
              >
                Message on WhatsApp
              </button>
            </div>
          </div>

          <div className="cta-bottom">
            <p className="cta-bottom-text">Available Monday - Friday, 9 AM - 6 PM EST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;