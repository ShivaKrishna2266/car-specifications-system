'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './eventRegister.css'

const EventRegister = () => {
    const searchParams = useSearchParams();
    const eventParam = searchParams.get('event');
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (eventParam) {
            try {
                setEvent(JSON.parse(decodeURIComponent(eventParam)));
            } catch (error) {
                console.error('Failed to parse event data:', error);
            }
        }
    }, [eventParam]);

    return (
        <div className='background'>
            <form className="event-registration-form">
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="tel" placeholder="Phone Number" required />
                <select required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <input type="date" placeholder="Date of Birth" />
                <input type="number" placeholder="Number of Tickets" min="1" />
                <textarea placeholder="Comments or Questions" />
                <label>
                    <input type="checkbox" required /> I agree to the terms and conditions
                </label>
                <button type="submit" className="register-button">Submit Registration</button>
            </form>

        </div>
    );
};

export default EventRegister;
