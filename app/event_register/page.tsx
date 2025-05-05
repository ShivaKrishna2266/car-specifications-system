'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './eventRegister.css';

// Updated interface to include eventId and eventName
interface EventData {
  eventId: number;
  eventName: string;
  // Add more fields if needed
}

// Define the form data state shape
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  tickets: number;
  comments: string;
  agreeTerms: boolean;
}

const EventRegister = () => {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get('event');
  const [event, setEvent] = useState<EventData | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    tickets: 1,
    comments: '',
    agreeTerms: false,
  });

  useEffect(() => {
    if (eventParam) {
      try {
        const parsedEvent: EventData = JSON.parse(decodeURIComponent(eventParam));
        setEvent(parsedEvent);
      } catch (error) {
        console.error('Failed to parse event data:', error);
      }
    }
  }, [eventParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;

    const updatedValue =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const registrationData = {
      name: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phone,
      gender: formData.gender,
      date: new Date(formData.dob).toISOString(),
      ticket: formData.tickets.toString(),
      comments: formData.comments,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'user1',
      eventId: event ? event.eventId : null,
    };

    try {
      const response = await fetch('http://localhost:9090/data/addEventRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        alert('Registration successful!');
      } else {
        console.error('Registration failed:', response.statusText);
        alert('Registration failed!');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="background">
      <form className="event-registration-form" onSubmit={handleSubmit}>
        <h2 className='name'>{event ? event.eventName : 'Event Registration'}</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="tickets"
          min="1"
          value={formData.tickets}
          onChange={handleChange}
          required
        />

        <textarea
          name="comments"
          placeholder="Comments or Questions"
          value={formData.comments}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
         <b> I agree to the terms and conditions</b>
        </label>

        <button type="submit" className="register-button">
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default EventRegister;
