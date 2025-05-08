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

  const roles = [
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

        // Automatically set role to USER
        setFormData(prev => ({ ...prev, role: 'ROLE_USER' }));
      } catch (err) {
        console.error('Failed to parse event param', err);
      }
    }
  }, [eventParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    // Handle checkbox separately
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
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
          password,
          role,
          agreeToTerms,
          eventId: eventDetails?.eventId ?? null,
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

      // Redirect
      if (role === 'ROLE_ADMIN') {
        router.push('/admin');
      } else {
        router.push('/login');
      }

    } catch (err) {
      console.error('Error during registration:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <section className="vh-50 bg-image">
      <div className="d-flex align-items-center h-100 gradient-custom">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-6 col-md-6 col-lg-6 col-xl-6">
              <div style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center text-light mb-3">
                    {eventDetails ? `Register for ${eventDetails.eventName}` : 'Create an account'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label">Your Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label">Mobile Number</label>
                    </div>

                    {!eventDetails && (
                      <div className="form-outline mb-4">
                        <select
                          className="form-control form-control-lg"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Role</option>
                          {roles.map((r) => (
                            <option key={r.id} value={r.value}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                        <label className="form-label">Role</label>
                      </div>
                    )}

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label">Repeat your password</label>
                    </div>

                    <div className="form-check d-flex justify-content-center text-light mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                      />
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
                      Already have an account? <Link href="/login"><u>Login here</u></Link>
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
