import React from 'react';
import { X, MapPin, Bed, Bath, Square, Phone, Mail } from 'lucide-react';
import './PropertyModal.css';

const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;
  const AGENT_PHONE = '+9182624047';
  const AGENT_WHATSAPP = '9182624047'; // No + or spaces

  const handleScheduleViewing = () => {
    window.location.href = `tel:${AGENT_PHONE}`;
  };

  const handleContactAgent = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in the property: ${property.title} (${property.location}) priced at ${property.price.toLocaleString()}`
    );
    window.open(`https://wa.me/${AGENT_WHATSAPP}?text=${message}`, '_blank');
  };

  reurn (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image-container">
          <img 
            src={property.image} 
            alt={property.title}
            className="modal-image"
          />
          <button
            onClick={onClose}
            className="modal-close-btn"
          >
            <X />
          </button>
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{property.title}</h2>
          <div className="modal-location">
            <MapPin className="modal-location-icon" />
            <span>{property.location}</span>
          </div>
          <div className="modal-features">
            <div className="modal-feature">
              <Bed className="modal-feature-icon" />
              <span>{property.beds} Bedrooms</span>
            </div>
            <div className="modal-feature">
              <Bath className="modal-feature-icon" />
              <span>{property.baths} Bathrooms</span>
            </div>
            <div className="modal-feature">
              <Square className="modal-feature-icon" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
          <div className="modal-details">
            <h3 className="modal-price">
              ₹{property.price.toLocaleString()}
            </h3>
            <p className="modal-description">
              This beautiful {property.type} offers modern living at its finest. Located in the heart of {property.location}, 
              this property features spacious rooms, contemporary finishes, and excellent amenities. Perfect for families 
              or professionals looking for a premium living experience.
            </p>
          </div>
          <div className="modal-actions">
            <button onClick={handleScheduleViewing} className="modal-btn-primary">
              <Phone className="btn-icon" />
              Schedule a Viewing
            </button>
            <button onClick={handleContactAgent} className="modal-btn-secondary">
              <Mail className="btn-icon" />
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;