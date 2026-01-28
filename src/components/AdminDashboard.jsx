import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = ({ properties, onAddProperty, onEditProperty, onDeleteProperty }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      onDeleteProperty(id);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingProperty(null);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Property Management</h1>
        <button 
          className="add-property-btn"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Add Property
        </button>
      </div>

      <div className="admin-controls">
        <div className="search-bar">
          <Search className="search-icon-admin" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="admin-filter-select"
        >
          <option value="all">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="townhouse">Townhouse</option>
        </select>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Properties</h3>
          <p className="stat-value">{properties.length}</p>
        </div>
        <div className="stat-card">
          <h3>Featured</h3>
          <p className="stat-value">{properties.filter(p => p.featured).length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Price</h3>
          <p className="stat-value">
            ₹{Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="properties-table-container">
        <table className="properties-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Price</th>
              <th>Beds</th>
              <th>Baths</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map(property => (
              <tr key={property.id}>
                <td>
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="table-image"
                  />
                </td>
                <td className="property-title-cell">{property.title}</td>
                <td>
                  <span className="type-badge">{property.type}</span>
                </td>
                <td>{property.location}</td>
                <td className="price-cell">₹{property.price.toLocaleString()}</td>
                <td>{property.beds}</td>
                <td>{property.baths}</td>
                <td>
                  <span className={`featured-badge-table ${property.featured ? 'active' : ''}`}>
                    {property.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(property)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProperties.length === 0 && (
          <div className="no-results">
            <p>No properties found</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <PropertyFormModal
          property={editingProperty}
          onClose={closeModal}
          onSave={editingProperty ? onEditProperty : onAddProperty}
        />
      )}
    </div>
  );
};

const PropertyFormModal = ({ property, onClose, onSave }) => {
  const [formData, setFormData] = useState(property || {
    title: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    sqft: '',
    type: 'apartment',
    image: '',
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(property?.image || '');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = formData.image;

    // If new image selected, upload to Firebase Storage
    if (imageFile) {
      // TODO: Integrate with Firebase Storage
      // const uploadResult = await uploadPropertyImage(imageFile, Date.now());
      // if (uploadResult.success) {
      //   imageUrl = uploadResult.url;
      // }
      console.log('Image file selected:', imageFile.name);
    }

    const propertyData = {
      ...formData,
      price: Number(formData.price),
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      sqft: Number(formData.sqft),
      image: imageUrl || imagePreview
    };

    onSave(propertyData);
    setUploading(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="property-form-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-modal-title">
          {property ? 'Edit Property' : 'Add New Property'}
        </h2>
        
        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Square Feet</label>
              <input
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Bedrooms</label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bathrooms</label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Property Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Or Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <label htmlFor="featured">Featured Property</label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn" disabled={uploading}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={uploading}>
              {uploading ? 'Uploading...' : (property ? 'Update' : 'Add')} Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;