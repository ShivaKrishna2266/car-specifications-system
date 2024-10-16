'use client';

import AsideMenu from '../components/AsideMenu';
import './ProductsPage.css';
import React, { useState, useEffect } from 'react';

// Function to fetch car models by brand
async function fetchCarModelsByBrand(brandName: string) {
  try {
    const res = await fetch(`http://localhost:9090/user/carBrand/${brandName}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch car models for brand ${brandName}. Status: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching car model data:', error);
    return [];
  }
}

export default function ProductsPage() {
  const [carModels, setCarModels] = useState([]); // Stores car models dynamically
  const [selectedBrand, setSelectedBrand] = useState(''); // To display the selected brand

  // Function to handle brand click
  const handleBrandClick = async (brandName: string) => {
    setSelectedBrand(brandName); // Set the selected brand
    const carModels = await fetchCarModelsByBrand(brandName); // Fetch car models by brand
    setCarModels(carModels.data); // Update car models
  };

  return (
    <div className="">
      <div className="container">
        <div className="row">
          <AsideMenu onBrandClick={handleBrandClick} />
          <main className="col-md-9">
            <h2 className="mb-4">{selectedBrand ? `Models for ${selectedBrand}` : 'Select a brandName'}</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {carModels.length > 0 ? (
                carModels.map((model: { modelId: number; modelName: string; specifications: string }) => (
                  <div className="col" key={model.modelId}>
                    <div className="card h-100">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFWeIrXchC-9QyHEjyUmqKKlrX5isDKv-pwRfD5gkwplJ7GxmAo_XdmGWZex1J6hvE-g&usqp=CAU" className="card-img-top" alt="Model Image" />
                      <div className="card-body">
                        <h5 className="card-title">{model.modelName}</h5>
                        <p className="card-text">{model.specifications}</p>
                        <a href="#" className="btn btn-primary">View Details</a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No models available for the selected brand.</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
