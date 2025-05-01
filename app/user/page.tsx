'use client';
import './user.css'
import React from 'react';

export default function UserDashboard() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const registeredEvents = [
    { eventName: 'Tech Conference 2025', date: '2025-05-15' },
    { eventName: 'AI Workshop', date: '2025-06-20' },
  ];

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>

      <div className="user-info">
        <h2>User Info</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="registered-events">
        <h2>Registered Events</h2>
        {registeredEvents.length === 0 ? (
          <p>No events registered.</p>
        ) : (
          <ul>
            {registeredEvents.map((event, index) => (
              <li key={index}>
                {event.eventName} — {new Date(event.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
