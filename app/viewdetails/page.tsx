'use client';

import { useEffect, useState } from 'react';
import '../viewdetails/view_details.css';
import { useCart } from '../context/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface CarModel {
  modelId: number;
  modelName: string;
  specifications: string;
  price: number;
  engine: string;
  transmission: string;
  infotainment: string;
  safety: string;
  fuelType: string;
  bodyType: string;
  seatingCapacity: string;
  colorOptions: string;
  exShowroomPrice: number;
  onRoadPrice: number;
  insurance: number;
  emiOption: string;
}

export default function CarModelDetails() {
  const [carModel, setCarModel] = useState<CarModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const modelId = searchParams.get('id');
  const { addToCart } = useCart();
  const router = useRouter();

  const API_URL = 'http://localhost:9090';
  // Fetch car model from the API on initial load
  useEffect(() => {
    if (!modelId) {
      setError('No model ID provided in the URL.');
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/data/getCarModelById/${modelId}`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.message || 'Failed to fetch model details');
          });
        }
        return res.json();
      })
      .then(data => {
        setCarModel(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Unable to load car model details.');
        setLoading(false);
      });
  }, [modelId]);

  if (loading) return <div className="container mt-5 text-center"><p>Loading...</p></div>;
  if (error) return <div className="container mt-5 text-center text-danger"><p>{error}</p></div>;
  if (!carModel) {
    return (
      <div className="container-fluid text-center ">
        <h2 className="text-danger">Error</h2>
        <p>No car model data found. Please go back and select a car model.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid ">
      <div className="image-container">
        <img
          src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/temerario/temerario/ar/AR%20Temerario.jpg"
          className="d-block w-100 img-fluid"
          alt={`Image of ${carModel.modelName}`}
        />
        <h1 className="centered-text">{carModel.modelName} </h1>
      </div>


      <div className="overview-section">
        <div className="overview-image">
          <img
            src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/gateway/ownership/s/gate_ownership_s1_03.jpg"
            alt="Lamborghini Temerario"
          />
        </div>
        <div className="overview-text">
          <h2 className="text-center ">OVERVIEW</h2>
          <p>
            Introducing the <strong>{carModel.modelName}</strong>, a stunning blend of innovation and performance. Equipped with a powerful <strong>{carModel.engine}</strong> and seamless <strong>{carModel.transmission}</strong> transmission, this {carModel.bodyType} redefines luxury on the road.
          </p>

          <p>
            Designed to deliver unmatched comfort for up to <strong>{carModel.seatingCapacity}</strong> passengers, the {carModel.modelName} features cutting-edge infotainment: <strong>{carModel.infotainment}</strong>, and advanced safety systems like <strong>{carModel.safety}</strong>. With color options such as <strong>{carModel.colorOptions}</strong>, this model offers unparalleled customization.
          </p>

          <p>
            Priced competitively with an ex-showroom price of <strong>${Number(carModel.exShowroomPrice).toLocaleString('en-IN')}</strong> and on-road price of <strong>${Number(carModel.onRoadPrice).toLocaleString('en-IN')}</strong>, it includes insurance worth <strong>${Number(carModel.insurance).toLocaleString('en-IN')}</strong>. Financing is flexible, with EMI plans starting from <strong>{carModel.emiOption}</strong>.
          </p>

        </div>
      </div>


      <div className="overview-section">
      <div className="overview-text">
          <h2 className="text-center ">CONNECTIVITY</h2>
          <p>Lamborghini connected services can be used from the moment you get in the car via the Lamborghini Infotainment System (LIS), an intuitive system that accesses information directly from the Web and allows you to manage it quickly and easily.</p>

        </div>
        <div className="overview-image">
          <img
            src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/gateway/ownership/s/gate_ownership_s3_02.jpg"
            alt="Lamborghini Temerario"
          />
        </div>
        
      </div>



      <div className="shadow-lg border-0 rounded-4 p-5 ">
        <h2 className="text-center mb-5 mt-5 text fw-bold">
          {carModel.modelName} - Premium Car Details
        </h2>
        <div className="card row align-items-center">
          <div className="col-md-6 mb-3 mt-5 text-center">
            <img
              loading="lazy"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFWeIrXchC-9QyHEjyUmqKKlrX5isDKv-pwRfD5gkwplJ7GxmAo_XdmGWZex1J6hvE-g&usqp=CAU"
              alt={`Image of ${carModel.modelName}`}
              className="img-fluid rounded-4 border shadow-lg"
            />
          </div>
          <div className="col-md-6">
            <ul className="list-group  list-group-flush fs-5">
              <li className="list-group-item bg-transparent">
                <strong className="text">Name: {carModel.modelName}</strong>
              </li>
              <li className="list-group-item bg-transparent">
                <strong className="text">Specifications: {carModel.specifications}</strong>
              </li>
              <li className="list-group-item bg-transparent">
                <strong className="text">Price: $ {Number(carModel.price).toLocaleString('en-IN')}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mt-5">
        <h2 className="text text-center mb-4">🔑 Key Features</h2>
        <div className="row">
          {[
            { icon: "fas fa-cogs", title: "Engine", content: carModel.engine, color: "primary" },
            { icon: "fas fa-sliders-h", title: "Transmission", content: carModel.transmission, color: "success" },
            { icon: "fas fa-music", title: "Infotainment", content: carModel.infotainment, color: "warning" },
            { icon: "fas fa-shield-alt", title: "Safety", content: carModel.safety, color: "danger" },
          ].map((feature, idx) => (
            <div className="col-md-3 mb-3" key={idx}>
              <div className="card h-100 text-center shadow p-3">
                <i className={`${feature.icon} fa-3x text-${feature.color} mb-2`}></i>
                <div className="card-body">
                  <h5 className="text">{feature.title}</h5>
                  <p className="text">{feature.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="mt-5">
        <h2 className="text-center text mb-4">🚗 Vehicle Details</h2>
        <div className="row">
          {[
            { icon: "fas fa-gas-pump", label: "Fuel Type", value: carModel.fuelType, color: "danger" },
            { icon: "fas fa-car-side", label: "Body Type", value: carModel.bodyType, color: "info" },
            { icon: "fas fa-users", label: "Seating Capacity", value: carModel.seatingCapacity, color: "success" },
            { icon: "fas fa-palette", label: "Color Options", value: carModel.colorOptions, color: "warning" },
          ].map((item, idx) => (
            <div className="col-md-3 mb-3" key={idx}>
              <div className="card-dark text-center shadow p-3 h-100">
                <i className={`${item.icon} fa-2x text-${item.color} mb-2`}></i>
                <h6 className="fw-bold text">{item.label}</h6>
                <p className="text">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspection */}
      {/* <div className="mt-5">
        <h2 className="text text-center mb-4">🔍 Inspection</h2>
        <p className="text text-center">
          We recommend scheduling a comprehensive inspection. Book one with our certified agents.
        </p>
        <button className="btn btn-outline-primary">Book Inspection</button>
      </div> */}

      {/* Reviews */}
      {/* <div className="mt-5">
        <h4 className="text mb-4">⭐ Customer Reviews</h4>
        {[ 
          { name: "Ravi Sharma", text: "Amazing driving experience! The mileage is great and the interior is super premium.", stars: "⭐⭐⭐⭐☆", time: "2 days ago" },
          { name: "Sneha Reddy", text: "Comfortable and smooth ride. Definitely worth the price. I highly recommend it!", stars: "⭐⭐⭐⭐⭐", time: "1 week ago" },
        ].map((review, idx) => (
          <div className="list-group-item border-0 shadow-sm p-3 mb-4 rounded-4 bg-dark" key={idx}>
            <h6 className="mb-1 fw-semibold text">{review.name}</h6>
            <p className="mb-2 text">"{review.text}"</p>
            <div className="d-flex align-items-center">
              <span className="text">{review.stars}</span>
              <small className="ms-3 text">{review.time}</small>
            </div>
          </div>
        ))}
      </div> */}

      {/* FAQs */}
      {/* <div className="mt-5 ">
        <h4 className="text-primary mb-3">❓ Frequently Asked Questions</h4>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                What is the mileage of this model?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
              <div className="accordion-body text">
                This car offers a mileage of approximately 18–20 km/l depending on the variant and driving conditions.
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
