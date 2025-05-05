'use client';

import React, { useEffect, useState } from 'react';
import tokenService from '../tokenService';
import './SearchForm.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CarModel {
  modelId: number;
  modelName: string;
}

export default function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [models, setModels] = useState<CarModel[]>([]);
  const router = useRouter();

  const checkLoginStatus = () => {
    const role = tokenService.getRole();
    setIsAdmin(role === 'ROLE_ADMIN');
    setIsUser(role === 'ROLE_USER');
    setIsLoggedIn(!!tokenService.getToken());
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener('userLoggedIn', checkLoginStatus);
    window.addEventListener('userLoggedOut', checkLoginStatus);

    return () => {
      window.removeEventListener('userLoggedIn', checkLoginStatus);
      window.removeEventListener('userLoggedOut', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:9090/data/getAllCarModels')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setModels(data.data);
      })
      .catch(err => console.error('Failed to fetch models:', err));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleViewDetailsClick = (model: CarModel) => {
    router.push(`/viewdetails?id=${model.modelId}`);
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

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link href="/" legacyBehavior><a className="nav-link text-white">HOME</a></Link></li>
            <li className="nav-item"><Link href="/events" legacyBehavior><a className="nav-link text-white">EVENTS</a></Link></li>

            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle text-white btn btn-link" data-bs-toggle="dropdown" type="button">
                MODELS
              </button>
              <ul className="dropdown-menu">
                {models.map(model => (
                  <li key={model.modelId}>
                    <button onClick={() => handleViewDetailsClick(model)} className="dropdown-item">
                      {model.modelName}
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item"><Link href="/aboutUs" legacyBehavior><a className="nav-link text-white">ABOUT-US</a></Link></li>
            <li className="nav-item"><Link href="/contact_us" legacyBehavior><a className="nav-link text-white">CONTACT</a></Link></li>

            {isLoggedIn && isAdmin && (
              <li className="nav-item"><Link href="/admin" legacyBehavior><a className="nav-link text-white">Admin Dashboard</a></Link></li>
            )}
            {isLoggedIn && isUser && (
              <li className="nav-item"><Link href="/user" legacyBehavior><a className="nav-link text-white">User Dashboard</a></Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
