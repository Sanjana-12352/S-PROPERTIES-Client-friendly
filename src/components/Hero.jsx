import React from 'react';
import { Search } from 'lucide-react';
import './Hero.css';

const Hero = ({ searchTerm, setSearchTerm, propertyType, setPropertyType }) => {
  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-title">Find Your Dream Home</h1>
          <p className="hero-subtitle">Discover the perfect property from our extensive listings</p>
        </div>

        <div className="search-box">
          <div className="search-grid">
            <div className="search-input-wrapper">
              <div className="input-with-icon">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by location or property name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="property-select"
            >
              <option value="all">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;