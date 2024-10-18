'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './LoginPage.css'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9090/api/users/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.text();
        console.log('Login successful:', data);
        router.push('/products');
      } else {
        const errorMessage = await response.text();
        alert(errorMessage || 'Invalid credentials! Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card col-md-6">
        <div className="card-body p-5 text-center">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleLogin}> 
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-left">Username</label>
              <input
                type="text"
                className="form-control text-left"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-t">
              <label htmlFor="password" className="form-label text-start-">Password</label>
              <input
                type="password"
                className="form-control text-left"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div><br></br>
            <button type="submit" className="btn btn-primary w-10">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
