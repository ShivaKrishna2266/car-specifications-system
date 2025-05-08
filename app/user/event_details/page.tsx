'use client';

import React, { useEffect, useState } from 'react';
import tokenService from '@/app/tokenService';
import './er.css';

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

interface User {
  userId: number;
  email: string;
  username: string;
}

function EventCard({ event }: { event: Event }) {
  return (
    <li key={event.eventId} className="">
      <h2 className="event-title">{event.eventName}</h2>
      <div className="event-card">
        <div className="event-details">
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
        </div>
        <div className="event-image">
          <img src={event.imageUrl || 'https://via.placeholder.com/300x150'} alt={event.eventName} className="image" />
        </div>
      </div>
    </li>
  );
}

export default function RegisteredEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const token = tokenService.getToken();
        const username = tokenService.getUserId();

        // Get all users
        const userRes = await fetch('http://localhost:9090/user/getAllUser', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userJson = await userRes.json();
        const users: User[] = userJson.data;

        const currentUser = users.find(u => u.username === username);
        if (!currentUser) throw new Error('User not found.');

        // Get all registered events for the user
        const eventRes = await fetch(`http://localhost:9090/user/getEventsByUserId/${currentUser.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!eventRes.ok) throw new Error('Failed to fetch registered events.');

        const eventJson = await eventRes.json();
        setEvents(eventJson.data || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  if (loading) return <p>Loading your registered events...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className="text-light">My Registered Events</h1>
      {events.length === 0 ? (
        <p>You haven't registered for any events yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map(event => (
            <EventCard key={event.eventId} event={event} />
          ))}
        </ul>
      )}
    </div>
  );
}
