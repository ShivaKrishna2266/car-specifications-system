import React from 'react';

export default function Navigation() {
  return (
    <nav className="mt-3 d-flex justify-content-center">
      <a href="/" className="nav-link text-white me-3">Home</a>
      <a href="./products" className="nav-link text-white me-3">Products</a>
      <a href="./aboutUs" className="nav-link text-white me-3">About Us</a>
      <a href="./contact_us" className="nav-link text-white">Contact</a>
    </nav>
  );
}
