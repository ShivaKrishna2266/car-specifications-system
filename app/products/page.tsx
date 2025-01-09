'use client';

import AsideMenu from '../components/AsideMenu';
import './ProductsPage.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import tokenService from '../tokenService';

async function fetchCarModelsByBrand(brandName: string) {
  try {
    const token = tokenService.getToken();

    if (!token) {
      console.error('No token found. Please log in.');
      return [];
    }
    console.log("Authorization Token:", token);

    const res = await fetch(`http://localhost:9090/user/carBrand/${brandName}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch car models for brand ${brandName}. Status: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Error fetching car model data:', error);
    return [];
  }
}

export default function ProductsPage() {
  const [carModels, setCarModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');


  useEffect(() => {
    const checkAuthentication = () => {
      const token = tokenService.getToken();
      if (!token) {
        setIsAuthenticated(false);
        return; // No token found, stay in the current page or redirect to login later
      }

      const role = tokenService.getRole(); // Assuming tokenService has a method to extract user role
      if (role === 'Admin' || role === 'User') {
        setIsAuthenticated(true);
        setUserRole(role);
      } else {
        setIsAuthenticated(false);
        return; // Invalid role, you can handle this case if needed
      }
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    const fetchInitialCarModels = async () => {
      setSelectedBrand('Toyota');
      const carModels = await fetchCarModelsByBrand('Toyota');
      setCarModels(carModels.data || []);
    };

    fetchInitialCarModels();
  }, []);


  const handleBrandClick = async (brandName: string) => {
    setSelectedBrand(brandName);
    const carModels = await fetchCarModelsByBrand(brandName);
    setCarModels(carModels.data);
  };

  const handleViewDeatailsClick = (
    model: { modelId: number; modelName: string; specifications: string }) => {
    localStorage.setItem('selectedCarModel', JSON.stringify(model));
    router.push('/viewdetails');
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
                carModels.map((model: { modelId: number; modelName: string; specifications: string; price: number }) => (
                  <div className="col" key={model.modelId}>
                    <div className="card h-100">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFWeIrXchC-9QyHEjyUmqKKlrX5isDKv-pwRfD5gkwplJ7GxmAo_XdmGWZex1J6hvE-g&usqp=CAU" className="card-img-top" alt="Model Image" />
                      <div className="card-body">
                        <h5 className="card-title">{model.modelName}</h5>
                        <p className="card-text">{model.specifications}</p>
                        <p className="card-text">{model.price}</p>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleViewDeatailsClick(model)}
                        >
                          View Details
                        </button>
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

