'use client';
import React, { useEffect, useState } from 'react';
import './events.css';

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

  return (
    <div className="events-container">
      <h1 className="events-heading">Shiva Event Works</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="events-grid">
          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            events.map((event, index) => (
              <div className="event-card" key={index}>
                <h2 className="event-title">{event.eventName}</h2>
                <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                <p className="event-description">{event.description}</p>
                <p className="event-location">Location: {event.location}</p>
                <p className="event-category">Category: {event.category}</p>
                <p className="event-organizer">Organizer: {event.organizerName}</p>
                <p className="event-contact-email">Contact Email: {event.contactEmail}</p>
                <p className="event-contact-phone">Contact Phone: {event.contactPhone}</p>
                <p className="event-status">Status: {event.status}</p>
                <p className="event-ticket-price">
                  Ticket Price: {event.isFree ? 'Free' : `$${event.ticketPrice}`}
                </p>
                <p className="event-attendees-count">
                  Attendees Count: {event.attendeesCount}
                </p>
                <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
                  Event Link
                </a>
                {event.bannerVideo && (
                  <video width="320" height="240" controls>
                    <source src={event.bannerVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <img src={event.imageUrl} alt={event.eventName} className="event-image" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
