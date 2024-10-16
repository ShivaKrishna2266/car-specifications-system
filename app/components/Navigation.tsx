import React from 'react';

export default function Navigation() {
  return (
    <nav className="mt-3 d-flex justify-content-center">
      <a href="/" className="text-white me-3">Home</a>
      <a href="./products" className="text-white me-3">Products</a>
      <a href="#" className="text-white me-3">About Us</a>
      <a href="#" className="text-white">Contact</a>
    </nav>
  );
}
