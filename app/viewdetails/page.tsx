'use client';

import { useEffect, useState } from 'react';
import '../viewdetails/view_details.css';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function CarModelDetails() {
  const [carModel, setCarModel] = useState<any>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const storedModel = localStorage.getItem('selectedCarModel');
    if (storedModel) {
      setCarModel(JSON.parse(storedModel));
    }
  }, [router]);

  const handleBookCar = () => {
    addToCart(carModel);
    router.push('/cart-details');
  };

  if (!carModel) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Error</h2>
        <p>No car model data found. Please go back and select a car model.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg border-0 rounded-4 p-5 bg-light">
        <h2 className="text-center mb-4 text-primary fw-bold">
          {carModel.modelName} - Premium Car Details
        </h2>
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFWeIrXchC-9QyHEjyUmqKKlrX5isDKv-pwRfD5gkwplJ7GxmAo_XdmGWZex1J6hvE-g&usqp=CAU"
              alt={carModel.modelName}
              className="img-fluid rounded-4 border shadow-lg"
              style={{ maxHeight: '350px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <ul className="list-group list-group-flush fs-5">
              <li className="list-group-item bg-transparent">
                <strong className="text-muted">Name:</strong> {carModel.modelName}
              </li>
              <li className="list-group-item bg-transparent">
                <strong className="text-muted">Specifications:</strong> {carModel.specifications}
              </li>
              <li className="list-group-item bg-transparent">
                <strong className="text-muted">Price:</strong> ₹ {Number(carModel.price).toLocaleString('en-IN')}
              </li>
            </ul>
            <div className="mt-4 d-grid">
              <button className="btn btn-success btn-lg fw-semibold" onClick={handleBookCar}>
                🚗 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mt-5">
        <h4 className="text-primary mb-4">🔑 Key Features</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Engine:</strong> 2.0L 4-cylinder turbocharged engine for a smooth and powerful ride.
          </li>
          <li className="list-group-item">
            <strong>Transmission:</strong> 6-speed automatic transmission for seamless gear shifts.
          </li>
          <li className="list-group-item">
            <strong>Infotainment:</strong> 10-inch touchscreen with Android Auto and Apple CarPlay compatibility.
          </li>
          <li className="list-group-item">
            <strong>Safety:</strong> Equipped with 6 airbags, ABS, and stability control for enhanced safety.
          </li>
        </ul>
      </div>

      {/* Vehicle Details Section */}
      <div className="mt-5">
        <h4 className="text-primary mb-4">🚗 Vehicle Details</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Fuel Type:</strong> Petrol
          </li>
          <li className="list-group-item">
            <strong>Body Type:</strong> Sedan
          </li>
          <li className="list-group-item">
            <strong>Seating Capacity:</strong> 5
          </li>
          <li className="list-group-item">
            <strong>Color Options:</strong> White, Black, Silver, Red
          </li>
        </ul>
      </div>

      {/* Price Details Section */}
      <div className="mt-5">
        <h4 className="text-primary mb-4">💰 Price Details</h4>
        <div className="card shadow-sm mb-3 p-4">
          <ul className="list-group">
            <li className="list-group-item bg-transparent">
              <strong>Ex-Showroom Price:</strong> ₹ {Number(carModel.exShowroomPrice).toLocaleString('en-IN')}
            </li>
            <li className="list-group-item bg-transparent">
              <strong>On-Road Price:</strong> ₹ {Number(carModel.onRoadPrice).toLocaleString('en-IN')}
            </li>
            <li className="list-group-item bg-transparent">
              <strong>Insurance:</strong> ₹ {Number(carModel.insurancePrice).toLocaleString('en-IN')}
            </li>
            <li className="list-group-item bg-transparent">
              <strong>EMI Option:</strong> ₹ {Number(carModel.emiOption).toLocaleString('en-IN')} per month
            </li>
          </ul>
        </div>
      </div>

      {/* Inspection Section */}
      <div className="mt-5">
        <h4 className="text-primary mb-4">🔍 Inspection</h4>
        <p className="text-muted">
          We recommend that all potential buyers schedule a comprehensive inspection to ensure the vehicle
          meets your expectations. You can book an inspection with our certified agents for a detailed review.
        </p>
        <button className="btn btn-outline-primary">Book Inspection</button>
      </div>

      {/* More Cars Section */}
      <div className="mt-5">
        <h4 className="text-primary mb-4">🚘 More Cars You Might Like</h4>
        <div className="row">
          {[...Array(3)].map((_, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFWeIrXchC-9QyHEjyUmqKKlrX5isDKv-pwRfD5gkwplJ7GxmAo_XdmGWZex1J6hvE-g&usqp=CAU"
                  alt="Car Model"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Car Model {idx + 1}</h5>
                  <p className="card-text">₹ 25,00,000</p>
                  <a href="#" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-5">
        <h4 className="text-primary mb-4">⭐ Customer Reviews</h4>
        <div className="list-group">
          <div className="list-group-item border-0 shadow-sm p-3 mb-4 rounded-4 bg-white">
            <h6 className="mb-1 fw-semibold text-dark">Ravi Sharma</h6>
            <p className="mb-2 text-muted">
              "Amazing driving experience! The mileage is great and the interior is super premium."
            </p>
            <div className="d-flex align-items-center">
              <span className="text-warning">⭐⭐⭐⭐⭐</span>
            </div>
          </div>
          <div className="list-group-item border-0 shadow-sm p-3 mb-4 rounded-4 bg-white">
            <h6 className="mb-1 fw-semibold text-dark">Neha Verma</h6>
            <p className="mb-2 text-muted">
              "Loved the comfort and smooth ride. Definitely recommend to anyone looking for a premium sedan."
            </p>
            <div className="d-flex align-items-center">
              <span className="text-warning">⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
