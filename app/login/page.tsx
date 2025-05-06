'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import tokenService from '../tokenService';
import  './LoginPage.css'; // Import the CSS Module

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      const { token, role, userId } = data;

      // Store token, role, username, and userId using tokenService
      tokenService.setToken(token, role, username, userId);

      // Emit custom login event
      window.dispatchEvent(new Event("userLoggedIn"));

      // Redirect based on role
      if (role === "ROLE_ADMIN") {
        router.push('/admin');
      } else if (role === "ROLE_USER") {
        router.push('/user');
      } else {
        alert('Unknown role');
      }

    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="card col-md-6">
        <div className="p-4 mb-2 text-center">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label-1">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label-1">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form><br />
          <h6>You don't have an account? <Link href='/register'>Register here</Link></h6>
        </div>
      </div>
    </div>
  );
}
