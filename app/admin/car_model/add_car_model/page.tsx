"use client";

import tokenService from "@/app/tokenService";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function AddCarModel() {
  const [form, setForm] = useState({
    modelName: '',
    price: '',
    specifications: '',
    brandId: '',
    createdBy: tokenService.getUsername(),
  });

  const [message, setMessage] = useState('');
  const [brands, setCarBrands] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch car brands on component mount
    const fetchCarBrands = async () => {
      try {
        const token = tokenService.getToken();
        if (!token) {
          setMessage("Authentication required. Please log in.");
          return;
        }

        const response = await fetch("http://localhost:9090/admin/getAllCarBrand", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch car brands.");
        }

        const res = await response.json();
        setCarBrands(res.data || []); // Assuming response contains `data`
      } catch (error) {
        console.error("Error fetching car brands:", error);
        setMessage("Unable to load car brands.");
      }
    };

    fetchCarBrands();
  }, []); // Empty dependency array to run only once on mount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      modelName: form.modelName,
      price: Number(form.price),
      specifications: form.specifications,
      brandId: Number(form.brandId),
      createdBy: tokenService.getUsername(),
    };

    try {
      const response = await fetch("http://localhost:9090/admin/addCarModel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenService.getToken()}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setMessage("Car model added successfully!");
        setForm({ modelName: '', price: '', specifications: '', brandId: '', createdBy: '' });
        router.push('/admin/car_model');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to add car model"}`);
      }
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
                  <select
                    name="brandId"
                    className="form-control"
                    value={form.brandId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Car Brand
                    </option>
                    {brands.map((brand) => (
                      <option key={brand.brandId} value={brand.brandId}>
                        {brand.brandName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <button type="submit" className="btn btn-primary mr-10">
                    Add Product
                  </button>
                </div>
              </div>
            </form>
            {message && <div className="alert alert-info">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
