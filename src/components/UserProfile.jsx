import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Heart, Eye, Settings, LogOut } from 'lucide-react';
import PropertyCard from './PropertyCard';
import './UserProfile.css';

const UserProfile = ({ user, favorites, viewHistory, properties, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Sanjana ',
    email: user?.email || 'sanjana@gmail.com',
    phone: user?.phone || '+91 999999999',
    location: user?.location || 'Miyapur, Hyderabad'
  });

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));
  const viewedProperties = properties.filter(p => viewHistory.includes(p.id));

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    // TODO: Save to Firebase
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="user-profile-page">
      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <User size={48} />
            </div>
            <h2 className="profile-name">{profileData.name}</h2>
            <p className="profile-email">{profileData.email}</p>
          </div>

          <nav className="profile-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <Settings size={20} />
              Profile Settings
            </button>
            <button
              className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart size={20} />
              Favorites ({favoriteProperties.length})
            </button>
            <button
              className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <Eye size={20} />
              Viewing History ({viewedProperties.length})
            </button>
            <button className="nav-item logout" onClick={onLogout}>
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </aside>

        <main className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="section-header">
                <h2 className="section-title">Profile Information</h2>
                <button
                  className="edit-btn-profile"
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="profile-form">
                <div className="form-field">
                  <label className="field-label">
                    <User size={20} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="field-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">
                    <Mail size={20} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="field-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">
                    <Phone size={20} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="field-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">
                    <MapPin size={20} />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="field-input"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="profile-section">
              <h2 className="section-title">Favorite Properties</h2>
              {favoriteProperties.length > 0 ? (
                <div className="properties-grid-profile">
                  {favoriteProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      favorites={favorites}
                      toggleFavorite={() => {}}
                      onViewDetails={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Heart size={64} className="empty-icon" />
                  <p>You haven't favorited any properties yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="profile-section">
              <h2 className="section-title">Recently Viewed</h2>
              {viewedProperties.length > 0 ? (
                <div className="properties-grid-profile">
                  {viewedProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      favorites={favorites}
                      toggleFavorite={() => {}}
                      onViewDetails={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Eye size={64} className="empty-icon" />
                  <p>You haven't viewed any properties yet</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;