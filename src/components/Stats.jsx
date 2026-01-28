import React from 'react';
import { Building2, TrendingUp, Home } from 'lucide-react';
import './Stats.css';

const Stats = () => {
  return (
    <div className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          <div className="stat-item">
            <Building2 className="stat-icon" />
            <h3 className="stat-number">500+</h3>
            <p className="stat-label">Properties Listed</p>
          </div>
          <div className="stat-item">
            <TrendingUp className="stat-icon" />
            <h3 className="stat-number">1,200+</h3>
            <p className="stat-label">Happy Clients</p>
          </div>
          <div className="stat-item">
            <Home className="stat-icon" />
            <h3 className="stat-number">98%</h3>
            <p className="stat-label">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;