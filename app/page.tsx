import React from 'react';
import Script from 'next/script';

export default function HomePage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to the Car Specification System</h1>

      {/* Image Carousel */}
      <div id="carCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img 
              src="https://t3.ftcdn.net/jpg/08/68/87/14/240_F_868871426_pbtuxaZrRsBgAeCaZQbTAKFNnuXucZvd.jpg" 
              className="d-block w-100 img-fluid" 
              alt="Car 1"
            />
          </div>
          <div className="carousel-item">
            <img 
              src="https://images.unsplash.com/photo-1583810693475-6ed049df8c02" 
              className="d-block w-100 img-fluid" 
              alt="Car 2"
            />
          </div>
          <div className="carousel-item">
            <img 
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" 
              className="d-block w-100 img-fluid" 
              alt="Car 3"
            />
          </div>
        </div>
        <button 
          className="carousel-control-prev" 
          type="button" 
          data-bs-target="#carCarousel" 
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          data-bs-target="#carCarousel" 
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  );
}
