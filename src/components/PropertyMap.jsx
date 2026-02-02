import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import './PropertyMap.css';

const PropertyMap = ({ properties }) => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Use environment variable for API key
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  // Map container styling
  const mapContainerStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '12px'
  };

  // Center on Miyapur, Telangana, India
  const center = {
    lat: 17.4948, // Miyapur latitude
    lng: 78.3563  // Miyapur longitude
  };

  // Map options with dark theme
  const mapOptions = {
    zoom: 12, // Zoom level for city view
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    styles: [
      {
        elementType: 'geometry',
        stylers: [{ color: '#212121' }]
      },
      {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#212121' }]
      }
    ]
  };

  // Handle marker click
  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
  };

  // Handle info window close
  const handleInfoWindowClose = () => {
    setSelectedProperty(null);
  };

  // Navigate to property details
  const handleViewProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  // If no API key, show message
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="map-loading">
        <p>Google Maps API key not configured</p>
        <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
          Set REACT_APP_GOOGLE_MAPS_API_KEY in your environment variables
        </p>
      </div>
    );
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="map-loading">
        <div className="loader"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="property-map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
      >
        {/* Create markers for each property */}
        {properties.map((property) => (
          property.coordinates && (
            <Marker
              key={property.id}
              position={property.coordinates}
              onClick={() => handleMarkerClick(property)}
              icon={{
                url: property.featured 
                  ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                  : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />
          )
        ))}

        {/* Info Window */}
        {selectedProperty && (
          <InfoWindow
            position={selectedProperty.coordinates}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="map-info-window">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title}
                className="info-window-image"
              />
              <h3 className="info-window-title">{selectedProperty.title}</h3>
              <p className="info-window-location">{selectedProperty.location}</p>
              <p className="info-window-price">
                ${selectedProperty.price.toLocaleString()}
              </p>
              <div className="info-window-features">
                <span>{selectedProperty.beds} beds</span>
                <span>{selectedProperty.baths} baths</span>
                <span>{selectedProperty.sqft} sqft</span>
              </div>
              <button 
                onClick={() => handleViewProperty(selectedProperty.id)}
                className="info-window-btn"
              >
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default PropertyMap;