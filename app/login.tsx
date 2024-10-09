import React, { useState } from 'react';
import 'bootstrap'; // Import Bootstrap globally
import "./globals.css";

const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setErrorMessage('Username and Password are required.');
      return;
    }

    const formData = { username, password };

    try {
      const response = await fetch('http://localhost:9090/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setErrorMessage(''); // Clear error message after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="container custom-form-container mt-5">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6 mt-3 mb-3">
          <label htmlFor="username" className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="col-md-6 mt-3 mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && (
          <div className="col-12 mb-3">
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          </div>
        )}

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
