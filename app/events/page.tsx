'use client';
import React, { useEffect, useState } from 'react';
import './events.css';
import { useRouter } from 'next/navigation';

export interface Event {
  eventId: number;
  eventName: string;
  description: string;
  date: string; // Use string for ISO format, e.g., "2025-05-10"
  startTime: string; // e.g., "10:00:00"
  endTime: string;
  location: string;
  imageUrl: string;
  category: string;
  organizerName: string;
  contactEmail: string;
  contactPhone: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  isFree: boolean;
  ticketPrice: number;
  attendeesCount: number;
  eventLink: string;
  bannerVideo: string;
  createdAt: string; // e.g., "2025-04-28T10:30:00"
  updatedAt: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:9090/data/getAllEvents') // Replace with your actual API endpoint
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched Data:', data); // Check the structure here

        // Access the events from the "data" field in the response
        if (data && Array.isArray(data.data)) {
          const sortedData = [...data.data].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          setEvents(sortedData);
          console.log('Events set:', sortedData); // Verify if data is set to state
        } else {
          console.error('Error: Data is not in expected format:', data);
          setEvents([]); // Empty array in case of wrong format
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  }, []);

  const handleRegisterClick = () => {
    const encodedEvent = encodeURIComponent(JSON.stringify(event));
    router.push(`/event_register?event=${encodedEvent}`);
  };

  return (
    <div className="events-container">
      <h1 className="events-heading">Show All Events</h1>
      <div className='mt-3 mb-5'>
      <h5 className='text-end'><strong>Total Events:</strong>{events.length}</h5>
      </div>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="events-grid">
          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            events.map((event, index) => (
              <div className="event-card" key={index}>
                <div className='row'>
                  <div className='col-md-2'>
                  <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div className='col-md-5'>
                  <h2 className="event-title">{event.eventName}</h2>
                  <p className="event-description">{event.description}</p>
                  <p className="event-location">Location: {event.location}</p>
                  <p className="event-organizer">Organizer: {event.organizerName}</p>
                  </div>
                  <div className='col-md-5'>
                    <img src="https://lcarizona.com/wp-content/uploads/2022/09/Alpios.jpg" alt={event.eventName} className="event-image" />
                  </div>
                  
                </div>
                <button className="register-button" onClick={handleRegisterClick}>
                    Register
                  </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
