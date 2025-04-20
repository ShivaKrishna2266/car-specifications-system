'use client';

import React from 'react';
import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
    {/* <div className="footer-container">
      <div className="footer-section logo">
        <h2>CarSpecs</h2>
        <p>Your trusted car comparison and booking partner.</p>
      </div>
  
      <div className="footer-section links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/cars">All Cars</a></li>
          <li><a href="/products">Brands</a></li>
          <li><a href="/contact_us">Contact</a></li>
          <li><a href="/aboutUs">About Us</a></li>
        </ul>
      </div>
  
      <div className="footer-section contact">
        <h4>Contact Us</h4>
        <p>Email: support@carspecs.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Location: Hyderabad, India</p>
      </div>
    </div> */}
  
    <div className="footer-bottom">
      <p>&copy; 2025 CarSpecs. All rights reserved.</p>
    </div>
  </footer>
  
  );
}
