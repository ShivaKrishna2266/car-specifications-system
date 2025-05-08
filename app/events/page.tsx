'use client';

import React, { useEffect, useState } from 'react';
import './events.css';
import { useRouter } from 'next/navigation';
import tokenService from '../tokenService';

export interface Event {
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
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  isFree: boolean;
  ticketPrice: number;
  attendeesCount: number;
  eventLink: string;
  bannerVideo: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDTO {
  userId: number;
  username: string;
  email: string;
  password: string;
  mobile: string;
  role: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const token = tokenService.getToken();
  const rawUserId = tokenService.getUsername();

  useEffect(() => {
    fetch('http://localhost:9090/data/getAllEvents')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          const sortedData = [...data.data].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          setEvents(sortedData);
        } else {
          console.error('Unexpected data format:', data);
          setEvents([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!token || !rawUserId) {
      setError('User not logged in or user ID not found.');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:9090/user/getUserByUsername/${rawUserId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('User not found.');
          } else if (response.status === 403) {
            setError('Access denied.');
          } else {
            setError(`Failed to fetch user: ${response.statusText}`);
          }
          return;
        }
        const res = await response.json();
        console.log("Fetched User:", res.data);
        setUser(res.data);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('An error occurred while fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, rawUserId]);

  const checkUserRegistration = async (userId: number, eventId: number): Promise<boolean> => {
    const token = tokenService.getToken();
  
    try {
      const res = await fetch(
        `http://localhost:9090/user/checkRegistrations?eventId=${eventId}&userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (res.status === 403) {
        console.warn('Access denied. You may need to log in again.');
        return false;
      }
  
      const data = await res.json();
      return data.registered === true;
    } catch (error) {
      console.error('Error checking registration:', error);
      return false;
    }
  };
  

  const handleRegisterClick = async (event: Event) => {
    if (!token || !user) {
      const loginPrompt = window.confirm('You are not logged in. Do you want to log in to register for this event?');
      if (loginPrompt) {
        router.push('/login');
      } else {
        const eventParam = encodeURIComponent(JSON.stringify({
          eventId: event.eventId,
          eventName: event.eventName,
        }));
        router.push(`/register?event=${eventParam}`);
      }
      return;
    }

    const userId = user.userId;

    const alreadyRegistered = await checkUserRegistration(userId, event.eventId);
    if (alreadyRegistered) {
      alert('You are already registered for this event!');
      router.push(`/event-details/${event.eventId}`);
      return;
    }

    try {
      const res = await fetch('http://localhost:9090/user/registerEvent', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          eventId: event.eventId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Successfully registered!');
        router.push(`/event-details/${event.eventId}`);
      } else {
        alert(data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred while registering.');
    }
  };

  const handleViewDetailsClick = (eventId: number) => {
    router.push(`/event-details/${eventId}`);
  };

  return (
    <div className="events-container">
      <div className="image-container">
        <img
          src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/gateway_urus/performante/2022/centro_stile/urus_perfo_centrostile_06.jpg"
          className="d-block w-100 img-fluid"
          alt="Banner"
        />
        <h2 className="centered-text">Show All Events</h2>
      </div>

      <div className="mt-3 mb-5">
        <h5 className="text-end">
          <strong>Total Events:</strong> {events.length}
        </h5>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="events-grid">
          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            events.map((event) => (
              <div className="event-card" key={event.eventId}>
                <div className="row">
                  <div className="col-md-2">
                    <p className="event-date">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-md-5">
                    <h2 className="event-title">
                      <button
                        onClick={() => handleViewDetailsClick(event.eventId)}
                        className="dropdown-item"
                      >
                        {event.eventName}
                      </button>
                    </h2>
                    <p className="event-description">{event.description}</p>
                    <p className="event-location">Location: {event.location}</p>
                    <p className="event-organizer">Organizer: {event.organizerName}</p>
                  </div>
                  <div className="col-md-5">
                    <img
                      src={"https://t4.ftcdn.net/jpg/03/75/42/33/360_F_375423312_VcfklfhcmkVOj8cvJtorP5kQmpYaNndj.jpg"}
                      alt={event.eventName}
                      className="event-image"
                    />
                  </div>
                </div>
                <button
                  className="register-button"
                  onClick={() => handleRegisterClick(event)}
                >
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
