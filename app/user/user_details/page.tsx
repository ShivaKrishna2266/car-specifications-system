'use client';

import React, { useEffect, useState } from 'react';
import tokenService from '@/app/tokenService';
import './user_details.css'

// Interfaces
interface RegisteredEvent {
  eventName: string;
  date: string;
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
  registeredEvents?: RegisteredEvent[];
}

export default function UserDetails() {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = tokenService.getToken();
  const username = tokenService.getUserId(); // Ensure this returns correct userId from the token

  useEffect(() => {
    if (!token || !username) {
      setError('User not logged in or user ID not found.');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:9090/user/getUserByUsername/${username}`, {
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
  }, [token, username]);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!user) return <div>No user found.</div>;

  return (
    <div className="dashboard-container">
      <h1 className='text-light'>User Details</h1>
      <div className="user-card">
        <h2 className='text-light'>{user.username}</h2>
        <p><strong>ID:</strong> {user.userId}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <div className="user-meta">
          <p><strong>Created By:</strong> {user.createdBy}</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Updated By:</strong> {user.updatedBy}</p>
          <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
