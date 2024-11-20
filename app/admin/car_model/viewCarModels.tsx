"use client";

import tokenService from '@/app/tokenService';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Product {
  modelId: number;
  modelName: string;
  price: number;
  specifications: string;
  carBrandId: number;
}

export default function ViewCarModels() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  

  const fetchProductsData = async () => {
    try {
      const token = tokenService.getToken();

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      console.log("Authorization Token:", token);

      const response = await fetch('http://localhost:9090/admin/getAllCarModels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }

      const res = await response.json();
      console.log("Fetched Data:", res.data); // Debugging: Log API response
      setProducts(res.data); // Update state
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Could not load products. Please try again later.");
    }
  };

  const handleAddCarModel = () => {
    console.log("Add Car Model button clicked!");
    router.push('/admin/car_model');
  };

  useEffect(() => {
    fetchProductsData(); // Fetch products when the component mounts
  }, []);

  console.log("Products State:", products); // Debugging: Log products state

  return (
    <div className="container mt-4">
      <div>
        <button type="button" className="btn btn-primary" onClick={handleAddCarModel}>Add Car Model</button>
      </div>

      <table className="table table-bordered mt-5">
        <thead className="table-light">
          <tr>
            <th>S No</th>
            <th>Model Name</th>
            <th>Price</th>
            <th>Specifications</th>
            <th>Brand ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.modelId}>
                <td>{index + 1}</td>
                <td>{product.modelName}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.specifications}</td>
                <td>{product.carBrandId}</td>
                <td>
                  <FaEdit className="text-warning me-2 action-icon" onClick={() => {/* Edit product logic */}}/>
                  <FaTrash className="text-danger action-icon"onClick={() => {/* Delete product logic */}}/>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
