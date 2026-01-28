import React from 'react';
import PropertyCard from './PropertyCard';
import './PropertiesGrid.css';

const PropertiesGrid = ({ 
  properties, 
  propertyType, 
  favorites, 
  toggleFavorite, 
  onViewDetails 
}) => {
  const typeLabel = propertyType === 'all' 
    ? 'All Properties' 
    : `${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}s`;

  return (
    <div className="properties-section">
      <div className="properties-container">
        <div className="properties-header">
          <h2 className="properties-title">
            {typeLabel}
            <span className="properties-count">({properties.length} found)</span>
          </h2>
        </div>
        
        <div className="properties-grid">
          {properties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="no-properties">
            <p>No properties found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesGrid;