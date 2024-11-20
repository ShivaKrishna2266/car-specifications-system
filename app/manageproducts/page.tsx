"use client";

import React, { useEffect, useState } from 'react';
import tokenService from '../tokenService'; // Adjust the import path as needed
import { FaEdit, FaTrash } from 'react-icons/fa'; // For edit and delete icons
import { fetchProducts, addProduct, deleteProduct } from '../mockApi'; // Adjust the import path as needed

interface Product {
  modelId: number;
  modelName: string;
  price: number;
  specifications: string;
  carBrandId: number;
  createdBy: string;
}

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    modelName: '',
    price: '',
    specifications: '',
    carBrandId: '',
    createdBy: tokenService.getUsername(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      modelName: form.modelName,
      price: Number(form.price),
      specifications: form.specifications,
      carBrandId: Number(form.carBrandId),
      createdBy: tokenService.getUsername(),
    };

    await addProduct(newProduct);
    fetchProductsData();
    setForm({ modelName: '', price: '', specifications: '', carBrandId: '', createdBy: tokenService.getUsername() });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProductsData();
    }
  };



  const fetchProductsData = async () => {
    try {
      const token = tokenService.getToken();

      if (!token) {
        console.error('No token found. Please log in.');
        return [];
      }
      console.log("Authorization Token:", token);
      
      const response = await fetch('http://localhost:9090/admin/getAllCarModels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch products.");
      const data = await response.json();
      setProducts(data as Product[]);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Could not load products. Please try again later.");
    }
  };
  useEffect(() => {
    fetchProducts().then((data) => {
      console.log(data);  // Log the response data
      // setProducts(data);  
    });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{ borderRadius: '15px' }}>
            <div className="card-body p-5">
              <h2 className="d-flex justify-content-center mb-5">Manage Products</h2>
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                  <div className="">
                    <input
                      type="text"
                      name="modelName"
                      className="form-control"
                      value={form.modelName}
                      onChange={handleChange}
                      placeholder="Model Name"
                      required
                    />
                  </div>
                  <div className="">
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Price"
                      required
                    />
                  </div>
                  <div className="">
                    <textarea
                      name="specifications"
                      className="form-control"
                      value={form.specifications}
                      onChange={handleChange}
                      placeholder="Specifications"
                      required
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="carBrandId"
                      className="form-control"
                      value={form.carBrandId}
                      onChange={handleChange}
                      placeholder="Car Brand ID"
                      required
                    />
                  </div>
                  <div className="">
                    <button type="submit" className="btn btn-primary mr-10">Add Product</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered mt-5">
        <thead className="table-light">
          <tr>
            <th>Model Name</th>
            <th>Price</th>
            <th>Specifications</th>
            <th>Brand ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.modelId}>
                <td>{product.modelName}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.specifications}</td>
                <td>{product.carBrandId}</td>
                <td>
                  <FaEdit
                    className="text-warning me-2 action-icon"
                    onClick={() => {
                      /* Edit product logic */
                    }}
                  />
                  <FaTrash
                    className="text-danger action-icon"
                    onClick={() => handleDelete(product.modelId)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No products available</td>
            </tr>
          )}
        </tbody>

        <tbody>
          {Array.isArray(products) ? (
            products.map((product) => (
              <tr key={product.modelId}>
                <td>{product.modelName}</td>
                <td>${product.price.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No products available</td>
            </tr>
          )}
        </tbody>

        
      </table>
    </div>
  );
}
