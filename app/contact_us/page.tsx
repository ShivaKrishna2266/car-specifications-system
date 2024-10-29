"use client";

import { useState } from 'react';
import "./contactUs.css"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    type: '',
    fullName: '',
    email: '',
    websiteUrl: '',
    country: '',
    projects: '',
    enquiry: '',
  });

  const handleContactus = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="center-1">
      <div className="page-title">
        <h1>Contact Us</h1>
        <div className="container">
          <p>We're here to help, so get in touch!</p>
        </div>
      </div>
      <div className="page contact-page">
        <div className="page-body page-body-wrapper">
          <form onSubmit={handleContactus} id="contact-us-form">
            {/* Request Type Dropdown */}
            <div className="form-fields">
              <label htmlFor="Type">Request type:</label>
              <select
                name="type"
                id="Type"
                className="form-control"
                value={formData.type}
                onChange={handleContactus}
                required
              >
                <option value="">Select</option>
                <option value="1">General questions</option>
                <option value="2">Technical support</option>
                <option value="3">Partnership enquiries</option>
                <option value="4">Sales enquiries</option>
              </select>
            </div>

            {/* Name Input */}
            <div className="form-fields">
              <label htmlFor="FullName">Your name:</label>
              <input
                type="text"
                name="fullName"
                id="FullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleContactus}
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-fields">
              <label htmlFor="Email">Your email:</label>
              <input
                type="email"
                name="email"
                id="Email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleContactus}
                required
              />
            </div>

            {/* Country Dropdown (Modularize the options in a separate file if needed) */}
            <div className="form-fields">
              <label htmlFor="Country">Your country:</label>
              <select
                name="country"
                id="Country"
                value={formData.country}
                onChange={handleContactus}
              >
                <option value="">Select country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                {/* Add other countries */}
              </select>
            </div>

            {/* Enquiry Textarea */}
            <div className="form-fields">
              <label htmlFor="Enquiry">Enquiry:</label>
              <textarea
                name="enquiry"
                id="Enquiry"
                placeholder="Enter your enquiry"
                value={formData.enquiry}
                onChange={handleContactus}
                required
              />
            </div>

            {/* reCAPTCHA (use if integrated) */}
            {/* 
                    <ReCAPTCHA
                      sitekey="your-site-key"
                      onChange={(value) => console.log("Captcha value:", value)}
                    /> 
                    */}

            <button className='btn btn-primary' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
