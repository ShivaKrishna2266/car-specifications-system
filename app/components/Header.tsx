// app/components/Header.tsx
'use client';

import React from 'react';
import Navigation from './Navigation';
import SearchForm from './SearchForm';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartItems } = useCart();

  return (
    <header className="bg-dark text-white fixed top-0 left-0 w-full z-50">
      <div className="container-flued">
        <div className="d-flex justify-content-between align-items-center">
          <a href="/">
            <img
              src="https://lcarizona.com/wp-content/uploads/2021/08/LogowithLambo_280_80.jpg"
              alt="Logo"
              className="me-3"
              style={{ height: '95px' }}
            />
          </a>
          <Navigation />
          <SearchForm />
          {/* <a href="/cart-details" className="btn btn-light">
            Cart ({cartItems.length})
          </a> */}
        </div>
      </div>
    </header>
  );
}
