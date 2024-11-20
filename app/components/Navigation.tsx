"use client";

import React, { useEffect, useState } from 'react';
import tokenService from '../tokenService'; // Ensure this path is correct


export default function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const role = tokenService.getRole();
    setIsAdmin(role === "ROLE_ADMIN");
    setIsLoggedIn(!!tokenService.getToken());
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

  return (
    <nav className="mt-3 d-flex justify-content-center">
      <a href="/" className="nav-link text-white me-3">Home</a>
      <a href="./products" className="nav-link text-white me-3">Products</a>
      <a href="./aboutUs" className="nav-link text-white me-3">About Us</a>
      <a href="./contact_us" className="nav-link text-white me-3">Contact</a>

      {isLoggedIn && isAdmin && (
        // <a href="./manageproducts" className="nav-link text-white">Manage Products</a> <br />
        <a href="./admin" className="nav-link text-white">  Admin Dashboard</a>
      )}
    </nav>
  );
}
