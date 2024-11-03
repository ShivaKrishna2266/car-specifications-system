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
  const [form, setForm] = useState({
    modelName: '',
    price: '',
    specifications: '',
    carBrandId: '',
    createdBy: tokenService.getUsername(), // Fetch username from tokenService
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
      createdBy: tokenService.getUsername(), // Fetch username from tokenService
    };

    await addProduct(newProduct);
    fetchProductsData(); // Refresh the product list after adding a new product
    setForm({ modelName: '', price: '', specifications: '', carBrandId: '', createdBy: tokenService.getUsername() }); // Reset form
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProductsData(); // Refresh the product list after deletion
    }
  };

  const fetchProductsData = async () => {
    const data = await fetchProducts();
    setProducts(data as Product[]);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Products</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
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
          <div className="col-md-3">
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
          <div className="col-md-6">
            <textarea
              name="specifications"
              className="form-control"
              value={form.specifications}
              onChange={handleChange}
              placeholder="Specifications"
              required
            />
          </div>
          <div className="col-md-3">
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
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">Add Product</button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Model Name</th>
            <th>Price</th>
            <th>Specifications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.modelId}>
              <td>{product.modelName}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.specifications}</td>
              <td>
                <FaEdit className="text-warning me-2 action-icon" onClick={() => {/* Edit product logic */}} />
                <FaTrash className="text-danger action-icon" onClick={() => handleDelete(product.modelId)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
