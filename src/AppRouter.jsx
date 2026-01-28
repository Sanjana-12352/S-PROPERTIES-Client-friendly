// AppRouter.jsx - Main routing configuration
// Save this file as: src/AppRouter.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import PropertiesGrid from './components/PropertiesGrid';
import PropertyModal from './components/PropertyModal';
import Footer from './components/Footer';
import CTASection from './components/CTASection';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import ContactForm from './components/ContactForm';
import AdvancedFilters from './components/AdvancedFilters';
import PropertyDetailsPage from './components/PropertyDetailsPage';
import PropertyMap from './components/PropertyMap';
import AdminAuth from './components/AdminAuth';

import { mockProperties } from './data/mockdata';

// Home Page Component
const HomePage = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(null);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyType === 'all' || property.type === propertyType;
    
    let matchesFilters = true;
    if (filters) {
      if (filters.priceMin && property.price < Number(filters.priceMin)) matchesFilters = false;
      if (filters.priceMax && property.price > Number(filters.priceMax)) matchesFilters = false;
      if (filters.bedsMin && property.beds < Number(filters.bedsMin)) matchesFilters = false;
      if (filters.bathsMin && property.baths < Number(filters.bathsMin)) matchesFilters = false;
      if (filters.sqftMin && property.sqft < Number(filters.sqftMin)) matchesFilters = false;
      if (filters.sqftMax && property.sqft > Number(filters.sqftMax)) matchesFilters = false;
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.type)) matchesFilters = false;
      if (filters.featured && !property.featured) matchesFilters = false;
    }
    
    return matchesSearch && matchesType && matchesFilters;
  });

  let sortedProperties = [...filteredProperties];
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        sortedProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProperties.sort((a, b) => b.price - a.price);
        break;
      case 'beds-desc':
        sortedProperties.sort((a, b) => b.beds - a.beds);
        break;
      case 'sqft-desc':
        sortedProperties.sort((a, b) => b.sqft - a.sqft);
        break;
      default:
        break;
    }
  }

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="app">
      <Navbar />
      
      <Hero 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
      />
      
      <Stats />
      
      <div className="filters-button-container">
        <button 
          onClick={() => setShowFilters(true)}
          className="advanced-filters-btn"
        >
           Advanced Filters
        </button>
      </div>
      <PropertyMap properties={sortedProperties} />
      
      <PropertiesGrid 
        properties={sortedProperties}
        propertyType={propertyType}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      
      <CTASection />
      
      <ContactForm />
      
      <Footer />
      
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}

      {showFilters && (
        <AdvancedFilters
          onApplyFilters={applyFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};


const ContactPage = () => {
  return (
    <div className="app">
      <Navbar />
      <ContactForm />
      <Footer />
    </div>
  );
};
const LoginPage = () => {
  const [view, setView] = useState('login');
  
  if (view === 'signup') {
    return <Signup onSwitchToLogin={() => setView('login')} onClose={() => setView('login')} />;
  }
  
  if (view === 'reset') {
    return <ResetPassword onSwitchToLogin={() => setView('login')} />;
  }
  
  return (
    <Login 
      onSwitchToSignup={() => setView('signup')}
      onSwitchToReset={() => setView('reset')}
      onClose={() => setView('login')}
    />
  );
};

// Admin Page Wrapper
const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [properties, setProperties] = useState(mockProperties);
  React.useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    const authTime = localStorage.getItem('adminAuthTime');
    
    if (authStatus === 'true' && authTime) {
      // Check if authentication is less than 24 hours old
      const hoursSinceAuth = (new Date().getTime() - parseInt(authTime)) / (1000 * 60 * 60);
      if (hoursSinceAuth < 24) {
        setIsAuthenticated(true);
      } else {
        // Clear expired authentication
        localStorage.removeItem('isAdminAuthenticated');
        localStorage.removeItem('adminAuthTime');
      }
    }
  }, []);

  // If not authenticated, show password screen
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }


  const handleAddProperty = (newProperty) => {
    const property = {
      ...newProperty,
      id: Math.max(...properties.map(p => p.id)) + 1
    };
    setProperties([...properties, property]);
  };

  const handleEditProperty = (updatedProperty) => {
    setProperties(properties.map(p => 
      p.id === updatedProperty.id ? updatedProperty : p
    ));
  };

  const handleDeleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  return (
    <AdminDashboard
      properties={properties}
      onAddProperty={handleAddProperty}
      onEditProperty={handleEditProperty}
      onDeleteProperty={handleDeleteProperty}
    />
  );
};

// Profile Page Wrapper
const ProfilePage = () => {
  const [favorites] = useState([1, 2]);
  const [viewHistory] = useState([3, 4]);
  
  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/';
  };

  return (
    <UserProfile
      user={{ name: 'Sanjana Reddy', email: 'sanjana@gmail.com' }}
      favorites={favorites}
      viewHistory={viewHistory}
      properties={mockProperties}
      onLogout={handleLogout}
    />
  );
};

// Main App Router
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/property/:id" element={<PropertyDetailsPage properties={mockProperties} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;