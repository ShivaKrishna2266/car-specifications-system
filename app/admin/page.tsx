"use client";

import React, { useState } from 'react';
import ViewCarBrands from './car_brands/page';

import ViewCarModels from './car_model/viewCarModels';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'carBrands' | 'carModels'>('dashboard');

  const handleSectionChange = (section: 'dashboard' | 'carBrands' | 'carModels') => {
    setActiveSection(section);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-3">
          <h5 onClick={() => handleSectionChange('carBrands')} style={{ cursor: 'pointer' }}>Car Brands</h5>
          <h5 onClick={() => handleSectionChange('carModels')} style={{ cursor: 'pointer' }}>Car Models</h5>
        </div>
        <div className="col-md-9">
          {activeSection === 'dashboard' && (
            <div>
              <h2>Welcome to the Admin Dashboard</h2>
            </div>
          )}
          {activeSection === 'carBrands' && <ViewCarBrands />}
          {activeSection === 'carModels' && <ViewCarModels />}
        </div>
      </div>
    </div>
  );
}
