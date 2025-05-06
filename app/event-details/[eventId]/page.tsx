'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import './event_details.css'

interface RegisteredUser {
  userId: number;
  username: string;
  email: string;
  mobile: string;
  registrationDate: string;
}

interface EventDTO {
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
  const params = useParams();
  const eventId = params?.eventId;
  const [event, setEvent] = useState<EventDTO | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);

  useEffect(() => {
    if (!eventId) return;

    fetch(`http://localhost:9090/data/getEventById/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setEvent(data.data);
        } else {
          console.error('No event data found for the given eventId');
        }
      })
      .catch((err) => {
        console.error('Error fetching event details:', err);
      });
  }, [eventId]);


  useEffect(() => {
    if (!eventId) return;

    // Fetch event details
    fetch(`http://localhost:9090/data/getEventById/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setEvent(data.data);
      })
      .catch((err) => console.error('Error fetching event details:', err));

    // Fetch registered users
    fetch(`http://localhost:9090/data/getUsersByEventId/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) setRegisteredUsers(data.data);
      })
      .catch((err) => console.error('Error fetching registered users:', err));

  }, [eventId]);

  if (!event) return <p className="loading">Loading...</p>;

  return (
    <div className="event-container">
      <div className="event-hero">
        <div className="image-container-1">
          <img
            src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2025/s_01.jpg"
            className="d-block w-100 img-fluid"
            alt={event.eventName}
          />
          <h3 className="centered-text-1">
            Discover the Thrill of Innovation at Our {event.eventName}: An Unforgettable Automotive Experience
          </h3>

        </div>
        <div className="container">
          <div className="event-overlay">
            <h1 className="event-title">{event.eventName}</h1>
            <p className="event-category"><b>{event.category}</b> • {event.status}</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {/* Text on the left */}
          <div className="event-details col-md-6 col-sm-6">
            <div className="event-info">
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.startTime} – {event.endTime}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Organizer:</strong> {event.organizerName}</p>
              <p><strong>Contact:</strong> {event.contactEmail} | {event.contactPhone}</p>
              <p><strong>Price:</strong> {event.isFree ? 'Free' : `$${event.ticketPrice}`}</p>
            </div>

            <div className="event-description">
              <h1>About the Event</h1>
              <p>{event.description}</p>
            </div>
          </div>
          {/*  Image on the right */}
          <div className="event-image-1 col-md-6 col-sm-6">
            <img
              src={ "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/augmented-reality/revuelto/ar_revuelto.png"}
              className="img-fluid"
              alt={event.eventName}
            />
          </div>
        </div>
      </div>



      <div className="registered-users">
        <h2 >Registered Users</h2>

        {registeredUsers.length === 0 ? (
          <p>No users registered for this event.</p>
        ) : (
          <ul>
            {registeredUsers.map((user) => (
              <li key={user.userId} className="user-item">
                <p>
                  <strong>{user.username}</strong> – {user.email}, {user.mobile}
                </p>
                <p>Registered on: {new Date(user.registrationDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>


  );
}
