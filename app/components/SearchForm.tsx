"use client";

import React, { useEffect, useState } from 'react';
import tokenService from '../tokenService';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import './SearchForm.css';

export default function SearchForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  const checkLoginStatus = () => {
    const token = tokenService.getToken();
    const user = tokenService.getUsername();
    const userRole = tokenService.getRole();
    setIsLoggedIn(!!token);
    setUsername(user || '');
    setRole(userRole || '');
  };

  useEffect(() => {
    // Initial check on load
    checkLoginStatus();

    // Listen for custom login event to update state
    window.addEventListener("userLoggedIn", checkLoginStatus);

    return () => {
      window.removeEventListener("userLoggedIn", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    tokenService.clearToken();
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <form className="d-flex ">
    {/* <input
      className="form-control me-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
    />
    <button className="btn btn-outline-light me-3" type="submit">
      Search
    </button> */}

    {isLoggedIn ? (
      <div className="container-flued">
        <FaUserCircle onClick={handleLogout} className="logout-link" />
        <div className="user-modal">
          <p className="username">
            {username} ({role})
          </p>
          
          <button onClick={handleLogout} className="logout-link">
            Logout
          </button>
        </div>
      </div>
    ) : (
      <button type="button" className="btn btn-light">
      <a href="./login" className="nav-link text-dark "><b>LOG-IN</b><i className="fa fa-sign-in"></i>
      </a>
     </button>
    )}
  </form>

  );
}
