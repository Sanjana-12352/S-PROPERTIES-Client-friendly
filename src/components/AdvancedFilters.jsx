import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import './AdvancedFilters.css';

const AdvancedFilters = ({ onApplyFilters, onClose }) => {
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedsMin: '',
    bathsMin: '',
    sqftMin: '',
    sqftMax: '',
    propertyTypes: [],
    featured: false,
    sortBy: 'price-asc'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePropertyTypeToggle = (type) => {
    setFilters({
      ...filters,
      propertyTypes: filters.propertyTypes.includes(type)
        ? filters.propertyTypes.filter(t => t !== type)
        : [...filters.propertyTypes, type]
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      bedsMin: '',
      bathsMin: '',
      sqftMin: '',
      sqftMax: '',
      propertyTypes: [],
      featured: false,
      sortBy: 'price-asc'
    });
  };

  return (
    <div className="filters-overlay" onClick={onClose}>
      <div className="filters-panel" onClick={(e) => e.stopPropagation()}>
        <div className="filters-header">
          <div className="filters-title-section">
            <SlidersHorizontal size={24} />
            <h2 className="filters-title">Advanced Filters</h2>
          </div>
          <button className="filters-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="filters-body">
          <div className="filter-section">
            <h3 className="filter-section-title">Price Range</h3>
            <div className="filter-row">
              <div className="filter-input-group">
                <label className="filter-label">Min Price</label>
                <div className="price-input-wrapper">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="filter-input price-input"
                  />
                </div>
              </div>
              <div className="filter-input-group">
                <label className="filter-label">Max Price</label>
                <div className="price-input-wrapper">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleInputChange}
                    placeholder="No limit"
                    className="filter-input price-input"
                  />
                </div>
              </div>
            </div>
            <div className="price-presets">
              <button onClick={() => setFilters({...filters, priceMin: '', priceMax: '500000'})} className="preset-btn">
                Under ₹5000000
              </button>
              <button onClick={() => setFilters({...filters, priceMin: '500000', priceMax: '1000000'})} className="preset-btn">
                ₹5000000-₹1cr
              </button>
              <button onClick={() => setFilters({...filters, priceMin: '1000000', priceMax: ''})} className="preset-btn">
                Over ₹1cr
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-section-title">Property Type</h3>
            <div className="property-type-grid">
              <button
                className={`type-toggle-btn ${filters.propertyTypes.includes('house') ? 'active' : ''}`}
                onClick={() => handlePropertyTypeToggle('house')}
              >
                House
              </button>
              <button
                className={`type-toggle-btn ${filters.propertyTypes.includes('apartment') ? 'active' : ''}`}
                onClick={() => handlePropertyTypeToggle('apartment')}
              >
                Apartment
              </button>
              <button
                className={`type-toggle-btn ${filters.propertyTypes.includes('townhouse') ? 'active' : ''}`}
                onClick={() => handlePropertyTypeToggle('townhouse')}
              >
                Townhouse
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-section-title">Rooms</h3>
            <div className="filter-row">
              <div className="filter-input-group">
                <label className="filter-label">Min Bedrooms</label>
                <select
                  name="bedsMin"
                  value={filters.bedsMin}
                  onChange={handleInputChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              <div className="filter-input-group">
                <label className="filter-label">Min Bathrooms</label>
                <select
                  name="bathsMin"
                  value={filters.bathsMin}
                  onChange={handleInputChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-section-title">Square Footage</h3>
            <div className="filter-row">
              <div className="filter-input-group">
                <label className="filter-label">Min Sq Ft</label>
                <input
                  type="number"
                  name="sqftMin"
                  value={filters.sqftMin}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="filter-input"
                />
              </div>
              <div className="filter-input-group">
                <label className="filter-label">Max Sq Ft</label>
                <input
                  type="number"
                  name="sqftMax"
                  value={filters.sqftMax}
                  onChange={handleInputChange}
                  placeholder="No limit"
                  className="filter-input"
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-section-title">Sort By</h3>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleInputChange}
              className="filter-select full-width"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="beds-desc">Most Bedrooms</option>
              <option value="sqft-desc">Largest Square Footage</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <div className="filter-section">
            <label className="checkbox-filter">
              <input
                type="checkbox"
                name="featured"
                checked={filters.featured}
                onChange={handleInputChange}
              />
              <span>Show Featured Properties Only</span>
            </label>
          </div>
        </div>

        <div className="filters-footer">
          <button className="reset-filters-btn" onClick={handleReset}>
            Reset Filters
          </button>
          <button className="apply-filters-btn" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;