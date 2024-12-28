"use client";

import React, { useState } from 'react';
import ViewCarBrands from './car_brands/page';
import ViewCarModels from './car_model/page';
import "./admin.css"
import ViewCarColour from './car_colour/page';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'carBrands' | 'carModels' | 'carColour' | 'feedback'>('dashboard');

  const handleSectionChange = (section: 'dashboard' | 'carBrands' | 'carModels' | 'carColour' | 'feedback') => {
    setActiveSection(section);
  };

  return (
    <div className='container mt-5'>
      <div className="row">
        <div className="card col-md-3">
          <h5 onClick={() => handleSectionChange('carBrands')} style={{ cursor: 'pointer' }}>Car Brands</h5>
          <h5 onClick={() => handleSectionChange('carModels')} style={{ cursor: 'pointer' }}>Car Models</h5>
          <h5 onClick={() => handleSectionChange('carColour')} style={{ cursor: 'pointer' }}>Car Colour</h5>
          <h5 onClick={() => handleSectionChange('carModels')} style={{ cursor: 'pointer' }}>feedback</h5>
        </div>
        <div className="col-md-9 d-flex justify-content-center">
          {activeSection === 'dashboard' && (
            <div>
              <h2 className="d-flex justify-content-center mb-5">Welcome to the Admin Dashboard</h2>
            </div>
          )}
          {activeSection === 'carBrands' && <ViewCarBrands />}
          {activeSection === 'carModels' && <ViewCarModels />}
          {activeSection === 'carColour' && <ViewCarColour />}
        </div>
      </div>
    </div>
  );
}
