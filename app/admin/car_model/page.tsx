"use client";

import tokenService from "@/app/tokenService";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

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

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(products.length / recordsPerPage);

  const currentRecords = products.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const fetchProductsData = async () => {
    try {
      const token = tokenService.getToken();

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      console.log("Authorization Token:", token);

      const response = await fetch("http://localhost:9090/admin/getAllCarModels", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }

      const res = await response.json();
      console.log("Fetched Data:", res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Could not load products. Please try again later.");
    }
  };

  const handleAddCarModel = () => {
    console.log("Navigating to AddCarModel page");
    router.push("/admin/car_model/add_car_model");
  };

  const handleEditCarModel = (modelId: number) => {
    console.log("Navigating to EditCarModel page with modelId:", modelId);
    router.push(`/admin/car_model/edit_car_model`);
  };

  // const handleEditCarModel = (modelId: number) => {
  //   router.push(`/admin/car_model/edit_car_model/${modelId}`);
  // };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className="card container">
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddCarModel}
        >
          Add Car Model
        </button>
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
          {currentRecords.length > 0 ? (
            currentRecords.map((product, index) => (
              <tr key={product.modelId}>
                <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                <td>{product.modelName}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.specifications}</td>
                <td>{product.carBrandId}</td>
                <td>
                  <FaEdit
                    className="text-warning me-2 action-icon"
                    onClick={() => handleEditCarModel(product.modelId)}
                  />
                  <FaTrash
                    className="text-danger action-icon"
                    onClick={() => {
                      /* Delete product logic */
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No products available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <nav>
          <ul className="pagination">
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <button className="page-link">Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                <button className="page-link">{i + 1}</button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}