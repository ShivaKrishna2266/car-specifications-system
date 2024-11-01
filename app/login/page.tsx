'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './loginPage.css';
import tokenService from '../tokenService';

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
          "Authorization": tokenService.getToken() as string,
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      const { token, role } = data; // Assuming the response contains token and role

      // Store token and role using tokenService
      tokenService.setToken(token, role);

      console.log("Logged in successfully:", role);
      if (role === "ROLE_ADMIN") {
        router.push('/admin');
      } else if (role === "ROLE_USER") {
        router.push('/products');
      } else {
        alert("Unknown role! Please contact support.");
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
              <label htmlFor="username" className="form-label">Username</label>
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
              <label htmlFor="password" className="form-label">Password</label>
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
          </form>
        </div>
      </div>
    </div>
  );
}
