'use client';

import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';

export default function CarModelDetails() {
  const [carModel, setCarModel] = useState<any>(null);
  // const router = useRouter();

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
          <div className="col-md-6 mt-3 mb-3">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFWeIrXchC-9QyHEjyUmqKKlrX5isDKv-pwRfD5gkwplJ7GxmAo_XdmGWZex1J6hvE-g&usqp=CAU" className="" alt="" />
          </div>
          <div className="col-md-6 mt-5">
            <h5 className="card-title">Name :{carModel.modelName}</h5>
            <p className="card-text">Specifications :{carModel.specifications}</p>
            <p className="card-text">Price :{carModel.price} Rupeis</p>
          </div>
          
        </div>
        <button className="btn btn-primary">Book Car</button>
      </div>
    </div>
  );
}