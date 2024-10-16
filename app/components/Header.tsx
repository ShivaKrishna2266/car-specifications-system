import React from 'react';
import Navigation from './Navigation';
import SearchForm from './SearchForm';

export default function Header() {
  return (
    <header className="bg-dark text-white p-3 mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <a href="/">
            <img
              src="https://www.designrush.com/uploads/users/customer-11/image_1526487017_D4nHpYcQEqJIECHp7VuoM7UR9XJw8GdGB0wdshls.png"
              alt="Logo"
              className="me-3"
              style={{ height: '50px' }}
            />
          </a>
          <Navigation />
          <SearchForm />
        </div>
      </div>
    </header>
  );
}
