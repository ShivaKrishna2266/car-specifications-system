"use client";

import React, { useEffect, useState } from 'react';
import tokenService from '../tokenService'; // Ensure this path is correct


export default function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-3">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="/">
          BrandLogo
        </a> */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a href="/" className="nav-link text-white">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/products" className="nav-link text-white">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a href="/aboutUs" className="nav-link text-white">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a href="/contact_us" className="nav-link text-white">
                Contact
              </a>
            </li>
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <a href="/admin" className="nav-link text-white">
                  Admin Dashboard
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
