import React from 'react';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import './PropertyCard.css';

const PropertyCard = ({ property, favorites, toggleFavorite, onViewDetails }) => {
  const isFavorite = favorites.includes(property.id);

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img 
          src={property.image} 
          alt={property.title}
          className="property-image"
        />
        <button
          onClick={() => toggleFavorite(property.id)}
          className="favorite-btn"
        >
          <Heart 
            className={`heart-icon ${isFavorite ? 'favorite' : ''}`}
          />
        </button>
        {property.featured && (
          <div className="featured-badge">
            Featured
          </div>
        )}
      </div>
      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>
        <div className="property-location">
          <MapPin className="location-icon" />
          <span>{property.location}</span>
        </div>
        <div className="property-features">
          <div className="feature">
            <Bed className="feature-icon" />
            <span>{property.beds}</span>
          </div>
          <div className="feature">
            <Bath className="feature-icon" />
            <span>{property.baths}</span>
          </div>
          <div className="feature">
            <Square className="feature-icon" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
        <div className="property-footer">
          <span className="property-price">
            ₹ {property.price.toLocaleString()}
          </span>
          <button 
            onClick={() => onViewDetails(property)}
            className="view-details-btn"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;