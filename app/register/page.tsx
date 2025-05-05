'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './register.css';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventParam = searchParams.get('event');

  const [eventDetails, setEventDetails] = useState<{ eventId: number; eventName: string } | null>(null);
  const [roles, setRoles] = useState([]);
  const roles1 = [
    { id: 1, value: 'ROLE_ADMIN', name: 'ADMIN' },
    { id: 2, value: 'ROLE_USER', name: 'USER' },
  ];

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    role: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  useEffect(() => {
    if (eventParam) {
      try {
        const decoded = decodeURIComponent(eventParam);
        const parsed = JSON.parse(decoded);
        setEventDetails(parsed);
      } catch (err) {
        console.error('Failed to parse event param', err);
      }
    }
  }, [eventParam]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch('http://localhost:9090/data/getAllRoles');
        if (res.ok) {
          const data = await res.json();
          setRoles(data);
        } else {
          console.error('Failed to fetch roles');
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { username, email, mobile, role, password, agreeToTerms } = formData;

    try {
      const response = await fetch('http://localhost:9090/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          mobile,
          role,
          password,
          agreeToTerms,
          eventId: eventDetails?.eventId, // Include eventId
        }),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      alert('Registration successful!');


      if (role === "ROLE_ADMIN") {
        router.push('/admin');
      } else if (role === "ROLE_USER") {
        router.push('/login');
      } else {
        alert('Unknown role');
      }

      // if (role === 'ROLE_ADMIN') router.push('/admin');
      // else if (role === 'ROLE_USER') router.push('/user');
      // else alert('Unknown role');

    } catch (err) {
      console.error('Error registering:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <section className="vh-50 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center text-light mb-3">Create an account</h2>
                  {eventDetails && (
                    <div className="alert alert-info text-center">
                      Registering for: <strong>{eventDetails.eventName}</strong> (ID: {eventDetails.eventId})
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input type="text" className="form-control form-control-lg" name="username" value={formData.username} onChange={handleChange} required />
                      <label className="form-label">Your Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" className="form-control form-control-lg" name="email" value={formData.email} onChange={handleChange} required />
                      <label className="form-label">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="tel" className="form-control form-control-lg" name="mobile" value={formData.mobile} onChange={handleChange} required />
                      <label className="form-label">Mobile Number</label>
                    </div>

                    <div className="form-outline mb-4">
                      <select className="form-control form-control-lg" name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        {roles1.map((r) => (
                          <option key={r.id} value={r.value}>{r.name}</option>
                        ))}
                      </select>
                      <label className="form-label">Role</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" className="form-control form-control-lg" name="password" value={formData.password} onChange={handleChange} required />
                      <label className="form-label">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" className="form-control form-control-lg" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                      <label className="form-label">Repeat your password</label>
                    </div>

                    <div className="form-check d-flex justify-content-center text-light mb-5">
                      <input className="form-check-input me-2" type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} required />
                      <label className="form-check-label">
                        I agree to all statements in <a href="#"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                        Register
                      </button>
                    </div>

                    <p className="text-center text-light mt-5 mb-0">
                      Already have an account? <Link href="/login" className="fw-bold text-body "><u>Login here</u></Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
