'use client';

import tokenService from '@/app/tokenService';
import React, { useEffect, useState } from 'react';

interface Event {
  eventId: number;
  eventName: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  imageUrl: string;
  category: string;
  organizerName: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  isFree: boolean;
  ticketPrice: number;
  attendeesCount: number;
  eventLink: string;
  bannerVideo: string;
  createdAt: string;
  updatedAt: string;
}

export default function EventDetails() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = tokenService.getToken();

        const response = await fetch('http://localhost:9090/user/getAllEvents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`Failed to fetch events: ${response.statusText}`);

        const res = await response.json();
        setEvents(res.data);
      } catch (error: any) {
        console.error('Error fetching events:', error);
        setError(error.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>Registered Events</h1>
      {events.length === 0 ? (
        <p>No events registered.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.eventId} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h2>{event.eventName}</h2>
              <img src={event.imageUrl} alt={event.eventName} style={{ maxWidth: '100%', height: 'auto' }} />
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Status:</strong> {event.status}</p>
              <p><strong>Organizer:</strong> {event.organizerName}</p>
              <p><strong>Contact:</strong> {event.contactEmail} | {event.contactPhone}</p>
              <p><strong>Price:</strong> {event.isFree ? 'Free' : `$${event.ticketPrice}`}</p>
              <p><strong>Attendees:</strong> {event.attendeesCount}</p>
              {event.eventLink && <p><a href={event.eventLink} target="_blank">Event Link</a></p>}
              {event.bannerVideo && <p><a href={event.bannerVideo} target="_blank">Banner Video</a></p>}
              <p><strong>Description:</strong> {event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
