'use client';

import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import "../viewdetails/view_details.css"
import { useCart } from '../context/CartContext';

export default function CarModelDetails() {
  const [carModel, setCarModel] = useState<any>(null);
  const { addToCart } = useCart();

  
  // const router = useRouter();
  const handleBookCar = () => {
    addToCart(carModel);
   // alert("Car has been added to your cart!");
  };

  useEffect(() => {
    const storedModel = localStorage.getItem('selectedCarModel'); // Get the car model data from localStorage
    if (storedModel) {
      setCarModel(JSON.parse(storedModel)); // Parse and set the car model
    } else {
      // If no data is available in localStorage, redirect back to products page
      // router.push('/products-page');
    }
  }, [router]);

  // Handle the case where car model data might not exist
  if (!carModel) {
    return (
      <div className="container">
        <h2>Error</h2>
        <p>No car model data found. Please go back and select a car model.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{carModel.modelName} Car Model Details</h2>
      <div className="card">
        <div className="row">
          <div className="col-md-4 mt-3 mb-3">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFWeIrXchC-9QyHEjyUmqKKlrX5isDKv-pwRfD5gkwplJ7GxmAo_XdmGWZex1J6hvE-g&usqp=CAU" className="image" alt="" />
          </div>
          <div className="card-text col-md-5 mt-5">
            <h5 className="card-text"><b>Name</b> :{carModel.modelName}</h5>
            <p className="card-text"><b>Specifications</b> :{carModel.specifications}</p>
            <p className="card-text"><b>Price</b> :{carModel.price} Rupeis</p>
          </div>       
        </div>
      <button className="btn btn-primary"  onClick={handleBookCar}>Book Car</button>
      </div>
    </div>
  );
}
