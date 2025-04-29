"use client";

import React, { useState } from 'react';
import ViewCarBrands from './car_brands/page';
import ViewCarModels from './car_model/page';
import "./admin.css"
import ViewCarColour from './car_colour/page';
import ViewFeedBacks from './FeedBack/page'
import tokenService from '../tokenService';
import { useRouter } from 'next/navigation'; 
import Viewevents from './events/page';

export default function AdminDashboard() {

   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const router = useRouter();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'carBrands' | 'carModels' | 'carColour' | 'feedback' | 'events'>('dashboard');

  const handleSectionChange = (section: 'dashboard' | 'carBrands' | 'carModels' | 'carColour' | 'feedback' |'events') => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    tokenService.clearToken();
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <div className='container mt-5'>
      <div className="conntent-end">
      {/* <button type="button" className="btn btn-primary">LogOut</button> */}
      <button onClick={handleLogout} className="logout-link">
            Logout
          </button>
      </div>
      <div className="row">
        <div className="card col-md-3">
          <h5 onClick={() => handleSectionChange('carBrands')} style={{ cursor: 'pointer' }}>Car Brands</h5>
          <h5 onClick={() => handleSectionChange('carModels')} style={{ cursor: 'pointer' }}>Car Models</h5>
          <h5 onClick={() => handleSectionChange('events')} style={{ cursor: 'pointer' }}>Events</h5>
          {/* <h5 onClick={() => handleSectionChange('carColour')} style={{ cursor: 'pointer' }}>Car Colour</h5> */}
          {/* <h5 onClick={() => handleSectionChange('feedback')} style={{ cursor: 'pointer' }}>Feedback</h5> */}
        </div>
        <div className="col-md-9 d-flex justify-content-center">
          {activeSection === 'dashboard' && (
            <div>
              <h2 className="d-flex justify-content-center mb-5">Welcome to the Admin Dashboard</h2>
            </div>
          )}
          {activeSection === 'carBrands' && <ViewCarBrands />}
          {activeSection === 'carModels' && <ViewCarModels />}
          {activeSection === 'events' && <Viewevents />}
          {activeSection === 'carColour' && <ViewCarColour />}
          {activeSection === 'feedback' && <ViewFeedBacks />}
        </div>
      </div>
    </div>
  );
}
