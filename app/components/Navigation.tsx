"use client";

import React, { useEffect, useState } from 'react';
import tokenService from '../tokenService';
import './SearchForm.css';
import Link from 'next/link';
import Models from './Models';

interface CarModel {
  id: number;
  modelName: string;
}

export default function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [models, setModels] = useState<CarModel[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const checkLoginStatus = () => {
    const role = tokenService.getRole();
    setIsAdmin(role === "ROLE_ADMIN");
    setIsLoggedIn(!!tokenService.getToken());
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("userLoggedIn", checkLoginStatus);
    return () => window.removeEventListener("userLoggedIn", checkLoginStatus);
  }, []);

  useEffect(() => {
    fetch("http://localhost:9090/data/getAllCarModels")
      .then(res => res.json())
      .then(data => setModels(data))
      .catch(err => console.error("Failed to fetch models:", err));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg mt-3">
      <div className="container-fluid">
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

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a href="/" className="nav-link text-white">HOME</a>
            </li>

            <li className="nav-item">
              <a href="/" className="nav-link text-white">EVENTS</a>
            </li>

            <li className="nav-item dropdown">
              <div className="nav-link text-white dropdown">
                MODELS
                <div className="dropdown-content">
                  <a href="/show"><Models /></a>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a href="/" className="nav-link text-white">Membership</a>
            </li>

            <li className="nav-item">
              <a href="/aboutUs" className="nav-link text-white">ABOUT-US</a>
            </li>

            <li className="nav-item">
              <a href="/contact_us" className="nav-link text-white">CONTACT</a>
            </li>

            {/* Optional Admin Dashboard */}
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <a href="/admin" className="nav-link text-white">Admin Dashboard</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
