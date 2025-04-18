'use client';

import { useEffect, useState } from 'react';
import '../viewdetails/view_details.css';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function CarModelDetails() {
  const [carModel, setCarModel] = useState<any>(null);
  const { addToCart } = useCart();
  const router = useRouter();

  const [carModels, setCarModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedModel = localStorage.getItem('selectedCarModel');
    if (storedModel) {
      setCarModel(JSON.parse(storedModel));
    }
  }, [router]);




  // Fetch car models from the backend API
  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/cars'); // Replace with your actual API URL
        const data = await response.json();
        setCarModels(data); // Set car models to state
      } catch (error) {
        console.error("Error fetching car models:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarModels();
  }, []);

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
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />

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
                <strong className="text-muted">Price:</strong> $  {Number(carModel.price).toLocaleString('en-IN')}
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
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card h-100 text-center shadow p-3">
              <i className="fas fa-cogs fa-3x text-primary mb-2"></i>
              <div className="card-body">
                <h5 className="card-title">Engine</h5>
                <p className="card-text">{carModel.engine}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card h-100 text-center shadow p-3">
              <i className="fas fa-sliders-h fa-3x text-success mb-2"></i>
              <div className="card-body">
                <h5 className="card-title">Transmission</h5>
                <p className="card-text">{carModel.transmission}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card h-100 text-center shadow p-3">
              <i className="fas fa-music fa-3x text-warning mb-2"></i>
              <div className="card-body">
                <h5 className="card-title">Infotainment</h5>
                <p className="card-text">{carModel.infotainment}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card h-100 text-center shadow p-3">
              <i className="fas fa-shield-alt fa-3x text-danger mb-2"></i>
              <div className="card-body">
                <h5 className="card-title">Safety</h5>
                <p className="card-text">{carModel.safety}</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Vehicle Details Section */}
      <div className="mt-5">
        <h4 className="text-primary mb-4">🚗 Vehicle Details</h4>
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3 h-100">
              <i className="fas fa-gas-pump fa-2x text-danger mb-2"></i>
              <h6 className="fw-bold">Fuel Type</h6>
              <p className="text-muted">{carModel.fuelType}</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3 h-100">
              <i className="fas fa-car-side fa-2x text-info mb-2"></i>
              <h6 className="fw-bold">Body Type</h6>
              <p className="text-muted">{carModel.bodyType}</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3 h-100">
              <i className="fas fa-users fa-2x text-success mb-2"></i>
              <h6 className="fw-bold">Seating Capacity</h6>
              <p className="text-muted">{carModel.seatingCapacity}</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-center shadow p-3 h-100">
              <i className="fas fa-palette fa-2x text-warning mb-2"></i>
              <h6 className="fw-bold">Color Options</h6>
              <p className="text-muted">{carModel.colorOptions}</p>
            </div>
          </div>
        </div>
      </div>


      {/* Price Details Section */}
      <div className="mt-5">
        <h4 className="text-primary mb-4">💰 Price Details</h4>
        <div className="table-responsive">
          <table className="table table-bordered shadow rounded text-center">
            <thead className="table-light">
              <tr>
                <th className='text-primary'>S No</th>
                <th className="text-primary">Type</th>
                <th className="text-primary">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><i className="fas fa-store-alt me-2 text-info"></i>Ex-Showroom Price</td>
                <td>$  {Number(carModel.exShowroomPrice).toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>2</td>
                <td><i className="fas fa-road me-2 text-success"></i>On-Road Price</td>
                <td>$  {Number(carModel.onRoadPrice).toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>3</td>
                <td><i className="fas fa-shield-alt me-2 text-warning"></i>Insurance</td>
                <td>$  {Number(carModel.insurance).toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>4</td>
                <td><i className="fas fa-coins me-2 text-danger"></i>EMI Option</td>
                <td>$ {carModel.emiOption}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-end p-3 bg-light rounded shadow-sm">
          <h5 className="text-dark fw-bold">
            🧾 Total Price: $ {" "}
            {(
              Number(carModel.exShowroomPrice) +
              Number(carModel.onRoadPrice) +
              Number(carModel.insurance)
            ).toLocaleString("en-IN")}
          </h5>
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
            <p className="mb-2 text-muted">"Amazing driving experience! The mileage is great and the interior is super premium."</p>
            <div className="d-flex align-items-center">
              <span className="text-warning">⭐⭐⭐⭐☆</span>
              <small className="ms-3 text-muted">2 days ago</small>
            </div>
          </div>
          <div className="list-group-item border-0 shadow-sm p-3 mb-4 rounded-4 bg-white">
            <h6 className="mb-1 fw-semibold text-dark">Sneha Reddy</h6>
            <p className="mb-2 text-muted">"Comfortable and smooth ride. Definitely worth the price. I highly recommend it!"</p>
            <div className="d-flex align-items-center">
              <span className="text-warning">⭐⭐⭐⭐⭐</span>
              <small className="ms-3 text-muted">1 week ago</small>
            </div>
          </div>
        </div>
      </div>


      {/* FAQ Section */}
      <div className="mt-5 mb-5">
        <h4 className="text-primary mb-3">❓ Frequently Asked Questions</h4>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What is the mileage of this model?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                This car offers a mileage of approximately 18–20 km/l depending on the variant and driving conditions.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Is there a sunroof available in this model?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Yes, this model comes with an optional sunroof for an enhanced driving experience.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
