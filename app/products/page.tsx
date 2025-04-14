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

    const res = await fetch(`http://localhost:9090/user/carBrand/${brandName}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch car models for brand ${brandName}. Status: ${res.status}`);
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
  const [selectedBrand, setSelectedBrand] = useState('Toyota');
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 3;
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = tokenService.getToken();
    if (!token) return;

    const role = tokenService.getRole();
    if (role === 'Admin' || role === 'User') {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  useEffect(() => {
    const fetchInitialCarModels = async () => {
      const response = await fetchCarModelsByBrand(selectedBrand);
      setCarModels(response.data || []);
      setCurrentPage(1); // reset to page 1 when brand changes
    };

    fetchInitialCarModels();
  }, [selectedBrand]);

  const handleBrandClick = async (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const handleViewDeatailsClick = (model: any) => {
    localStorage.setItem('selectedCarModel', JSON.stringify(model));
    router.push('/viewdetails');
  };

  // Pagination logic
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = carModels.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(carModels.length / modelsPerPage);

  return (
    <div>
      <div className="container">
        <div className="row">
          <AsideMenu onBrandClick={handleBrandClick} />
          <main className="col-md-9">
            <h2 className="mb-4 text-center">All Products based on brand: <strong>{selectedBrand}</strong></h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {currentModels.length > 0 ? (
                currentModels.map((model: any) => (
                  <div className="col" key={model.modelId}>
                    <div className="card h-100">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFWeIrXchC-9QyHEjyUmqKKlrX5isDKv-pwRfD5gkwplJ7GxmAo_XdmGWZex1J6hvE-g&usqp=CAU" className="card-img-top" alt="Model Image" />
                      <div className="card-body">
                        <h5 className="card-title">{model.modelName}</h5>
                        <p className="card-text">{model.specifications}</p>
                        <p className="card-text">₹ {model.price}</p>
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

            {/* Pagination Buttons */}
            {totalPages > 1 && (
              <div className="pagination mt-4 d-flex justify-content-center">
                <button
                  className="btn btn-outline-primary mx-1"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`btn mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="btn btn-outline-primary mx-1"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
