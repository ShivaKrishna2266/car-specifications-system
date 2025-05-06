"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import "./contactUs.css";

interface ContactFormData {
  type: string;
  fullName: string;
  email: string;
  websiteUrl: string;
  country: string;
  enquiry: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<ContactFormData>({
    type: "",
    fullName: "",
    email: "",
    websiteUrl: "",
    country: "",
    enquiry: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      requestType: formData.type,
      name: formData.fullName,
      email: formData.email,
      country: formData.country,
      enquiry: formData.enquiry,
    };

    try {
      const response = await fetch("http://localhost:9090/data/createContactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Form submitted successfully!");
        setFormData({
          type: "",
          fullName: "",
          email: "",
          websiteUrl: "",
          country: "",
          enquiry: "",
        });
      } else {
        const errorData = await response.json();
        setMessage(`Submission failed: ${errorData.message || response.statusText}`);
      }
    } catch (error: any) {
      setMessage("Error submitting form: " + error.message);
    }
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
          <form onSubmit={handleSubmit} id="contact-us-form">
            {/* Request Type */}
            <div className="form-fields">
              <label htmlFor="type" className="form-label">Request type:</label>
              <select
                name="type"
                id="type"
                className="form-control"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="General questions">General questions</option>
                <option value="Technical support">Technical support</option>
                <option value="Partnership enquiries">Partnership enquiries</option>
                <option value="Sales enquiries">Sales enquiries</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="form-fields">
              <label htmlFor="fullName" className="form-label">Your name:</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-fields">
              <label htmlFor="email" className="form-label">Your email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Country */}
            <div className="form-fields">
              <label htmlFor="country" className="form-label">Your country:</label>
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="">Select country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                {/* Add more countries here */}
              </select>
            </div>

            {/* Enquiry */}
            <div className="form-fields">
              <label htmlFor="enquiry" className="form-label">Enquiry:</label>
              <textarea
                name="enquiry"
                id="enquiry"
                placeholder="Enter your enquiry"
                value={formData.enquiry}
                onChange={handleInputChange}
                required
              />
            </div>

            <button className="btn btn-primary" type="submit">Submit</button>

            {message && <p className="form-message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
