'use client';

import React, { useEffect, useState } from 'react';
import './user.css';
import UserDetails from './user_details/page';
import EventDetails from './event_details/page';


export default function UserDashboard() {


  return (
    <div className="dashboard-container">
      <UserDetails />
      <EventDetails />
    </div>
  );
}
