'use client';

import React, { useEffect, useState } from 'react';
import tokenService from '../tokenService';
import './SearchForm.css';
import Link from 'next/link';

interface CarModel {
  modelId: number;
  modelName: string;
}

export default function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [models, setModels] = useState<CarModel[]>([]);

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
      .then(data => {
        console.log("Navigation models:", data);
        setModels(data.data);
      })
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
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link href="/" className="nav-link text-white">HOME</Link></li>
            <li className="nav-item"><Link href="/events" className="nav-link text-white">EVENTS</Link></li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown">
                MODELS
              </a>
              <ul className="dropdown-menu">
                {models.map((model) => (
                  <li key={model.modelId}>
                    <Link href={`/model_lise/${model.modelId}`} className="dropdown-item">
                      {model.modelName}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item"><Link href="/" className="nav-link text-white">Membership</Link></li>
            <li className="nav-item"><Link href="/aboutUs" className="nav-link text-white">ABOUT-US</Link></li>
            <li className="nav-item"><Link href="/contact_us" className="nav-link text-white">CONTACT</Link></li>

            {isLoggedIn && isAdmin && (
              <li className="nav-item"><Link href="/admin" className="nav-link text-white">Admin Dashboard</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
