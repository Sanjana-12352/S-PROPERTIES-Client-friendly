import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Phone, Mail, Share2, ArrowLeft, ExternalLink, Compass } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './PropertyDetailsPage.css';

const PropertyDetailsPage = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const foundProperty = properties.find(p => p.id === parseInt(id));
    setProperty(foundProperty);
  }, [id, properties]);

  if (!property) {
    return (
      <div className="property-details-page">
        <Navbar />
        <div className="property-not-found">
          <h2>Property Not Found</h2>
          <button onClick={() => navigate('/')} className="back-btn-404">
            Go Back Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Replace with actual data - these would come from your database
  const propertyDetails = {
    ...property,
    contactNo: '+91 9182624047',
    facing: 'North-East',
    city: property.location.split(',')[1]?.trim() || 'Hyderabad',
    postalCode: '500049',
    amenities: ['Swimming Pool', 'Gym', 'Parking', '24/7 Security', 'Garden', 'Elevator'],
    youtubeUrl: '',
    description: `Welcome to this stunning ${property.type} located in the heart of ${property.location}. This exceptional property offers ${property.beds} spacious bedrooms and ${property.baths} modern bathrooms across ${property.sqft} square feet of living space.

Features include:
- Modern kitchen with high-end appliances
- Spacious living areas with natural light
- Premium fixtures and finishes throughout
- Energy-efficient systems
- Prime location with easy access to amenities

This is a rare opportunity to own a piece of luxury in one of the most sought-after neighborhoods. Perfect for families or professionals looking for comfort and style.`
  };

  const handleLocationClick = () => {
    const address = encodeURIComponent(property.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${propertyDetails.contactNo}`;
  };

  const handleWhatsAppShare = () => {
    const shareText = ` Check out this amazing property!

${property.title}
 ${property.location}
 $${property.price.toLocaleString()}
 ${property.beds} Beds |  ${property.baths} Baths | ${property.sqft} sqft

${propertyDetails.description.substring(0, 200)}...

View full details: ${window.location.href}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleYouTubeClick = () => {
    window.open(propertyDetails.youtubeUrl, '_blank');
  };

  return (
    <div className="property-details-page">
      <Navbar />
      
      <div className="details-container">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          Back to Properties
        </button>

        {/* Hero Image */}
        <div className="details-hero">
          <img src={property.image} alt={property.title} className="details-hero-image" />
          {property.featured && (
            <div className="featured-badge-details">Featured</div>
          )}
        </div>

        {/* Main Info */}
        <div className="details-content">
          <div className="details-header">
            <div>
              <h1 className="details-title">{property.title}</h1>
              <div className="details-location" onClick={handleLocationClick}>
                <MapPin className="location-icon-details" />
                <span>{property.location}</span>
                <ExternalLink size={16} className="external-link-icon" />
              </div>
            </div>
            <div className="details-price">₹{property.price.toLocaleString()}</div>
          </div>

          {/* Quick Stats */}
          <div className="details-stats">
            <div className="stat-box">
              <Bed className="stat-icon-details" />
              <div>
                <span className="stat-value">{property.beds}</span>
                <span className="stat-label">Bedrooms</span>
              </div>
            </div>
            <div className="stat-box">
              <Bath className="stat-icon-details" />
              <div>
                <span className="stat-value">{property.baths}</span>
                <span className="stat-label">Bathrooms</span>
              </div>
            </div>
            <div className="stat-box">
              <Square className="stat-icon-details" />
              <div>
                <span className="stat-value">{property.sqft}</span>
                <span className="stat-label">Sqft</span>
              </div>
            </div>
            <div className="stat-box">
              <Compass className="stat-icon-details" />
              <div>
                <span className="stat-value">{propertyDetails.facing}</span>
                <span className="stat-label">Facing</span>
              </div>
            </div>
          </div>

          {/* Property Details Grid */}
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Property Type:</span>
              <span className="detail-value">{property.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">City:</span>
              <span className="detail-value">{propertyDetails.city}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Postal Code:</span>
              <span className="detail-value">{propertyDetails.postalCode}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Contact Number:</span>
              <span className="detail-value clickable" onClick={handleCall}>
                {propertyDetails.contactNo}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="details-section">
            <h2 className="section-title">Description</h2>
            <p className="description-text">{propertyDetails.description}</p>
          </div>

          {/* Amenities */}
          <div className="details-section">
            <h2 className="section-title">Amenities</h2>
            <div className="amenities-grid">
              {propertyDetails.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span className="amenity-check">✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Video Tour */}
          <div className="details-section">
            <h2 className="section-title">Video Tour</h2>
            <button onClick={handleYouTubeClick} className="youtube-btn">
              <ExternalLink size={20} />
              Watch on YouTube
            </button>
          </div>

          {/* Action Buttons */}
          <div className="details-actions">
            <button onClick={handleCall} className="action-btn primary">
              <Phone size={20} />
              Call Agent
            </button>
            <button onClick={handleWhatsAppShare} className="action-btn whatsapp">
              <Share2 size={20} />
              Share via WhatsApp
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetailsPage;