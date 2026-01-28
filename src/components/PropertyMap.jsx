import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import './PropertyMap.css';

const PropertyMap = ({ properties }) => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // YOUR GOOGLE MAPS API KEY HERE
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
;

  // LESSON: Load Google Maps API
  // This hook loads the Google Maps script
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  // LESSON: Map container styling
  // This defines how big the map will be
  const mapContainerStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '12px'
  };

  // LESSON: Center of the map
  // We'll center on USA (you can change this)
  const center = {
    lat: 17.3850 , 
    lng: 78.4867
  };

  
  const mapOptions = {
    zoom: 4, // How zoomed in (1 = world, 20 = street level)
    mapTypeControl: true, // Show satellite/terrain options
    streetViewControl: true, // Show street view
    fullscreenControl: true, // Show fullscreen button
    styles: [ // Custom dark theme for your black background
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

  // LESSON: Handle marker click
  // When user clicks a marker, show property info
  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
  };

  // LESSON: Handle info window close
  const handleInfoWindowClose = () => {
    setSelectedProperty(null);
  };

  // LESSON: Navigate to property details
  const handleViewProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  // LESSON: Show loading state
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
        zoom={4}
        options={mapOptions}
      >
        {/* LESSON: Create markers for each property */}
        {properties.map((property) => (
          property.coordinates && ( // Only show if coordinates exist
            <Marker
              key={property.id}
              position={property.coordinates}
              onClick={() => handleMarkerClick(property)}
              icon={{
                // Custom marker icon
                url: property.featured 
                  ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Blue for featured
                  : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Red for regular
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />
          )
        ))}

        {/* LESSON: Info Window - Shows when marker is clicked */}
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