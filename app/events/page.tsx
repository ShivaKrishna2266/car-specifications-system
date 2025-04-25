'use client';
import React from 'react';
import './events.css'; // CSS in a separate file

type Event = {
  title: string;
  date: string;
  description: string;
};

export default function Events() {
  const events: Event[] = [
    {
      title: 'Luxury Car Expo',
      date: '2025-05-10',
      description: 'Experience the latest models from top car brands, including Lamborghini, Ferrari, and more.'
    },
    {
      title: 'Performance Test Drive Day',
      date: '2025-04-28',
      description: 'Get behind the wheel of high-performance cars and test them on a custom-built track.'
    },
    {
      title: 'Classic Car Show',
      date: '2025-05-01',
      description: 'A celebration of vintage automotive excellence with restored classics and collector vehicles.'
    }
  ];

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="events-container">
      <h1 className="events-heading">Shiva Event Works</h1>
      <div className="events-grid">
        {sortedEvents.map((event, index) => (
          <div className="event-card" key={index}>
            <h2 className="event-title">{event.title}</h2>
            <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
