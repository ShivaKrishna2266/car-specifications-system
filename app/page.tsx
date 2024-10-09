'use client';

import React, { useState } from 'react';
import axios from 'axios';
import "./globals.css";
import "bootstrap";

const SignInForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
        setErrorMessage('Username and Password are required.');
        return;
    }

    const formData = new URLSearchParams();
    formData.append('username', username);  // Correct param name
    formData.append('password', password);  // Correct param name

    try {
        const response = await axios.post('http://localhost:9090/api/users/register', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  // URL-encoded form data
            },
        });
        console.log('Form submitted successfully:', response.data);
        setErrorMessage('');
    } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage('Failed to submit the form. Please try again.');
    }
};
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6 mt-3 mb-3">
        <label htmlFor="username" className="form-label">User Name</label>
        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUserName(e.target.value)} />
      </div>

      <div className="col-md-6 mt-3 mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">Sign in</button>
      </div>
    </form>
  );
};

export default SignInForm;

function setErrorMessage(arg0: string) {
  throw new Error('Function not implemented.');
}

