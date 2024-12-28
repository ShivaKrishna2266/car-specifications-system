"use client";

import tokenService from "@/app/tokenService";
import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function AddCarModel() {

  const [form, setForm] = useState({
    modelName: '',
    price: '',
    specifications: '',
    carBrandId: '',
    createdBy: tokenService.getUsername(),
  });

  const [message, setMessage] = useState('');
  const router = useRouter();

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

    try {
      const response = await fetch("http://localhost:9090/admin/addCarModel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Adjust token retrieval as per your setup
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setMessage("Car model added successfully!");
        setForm({ modelName: '', price: '', specifications: '', carBrandId: '', createdBy: '' });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to add car model"}`);
      }

      router.push('/admin/car_model');
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
      console.error("Error adding car model:", error);
    }
  };


  return (

    <div className="d-flex justify-content-center align-items-center h-100 mt-5 mb-5">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <div className="card" style={{ borderRadius: '15px' }}>
          <div className="card-body p-5">
            <h2 className="d-flex justify-content-center mb-5">Add Car Models</h2>
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
  )
}


