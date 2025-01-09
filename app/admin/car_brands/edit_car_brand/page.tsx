"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import tokenService from "@/app/tokenService"; // Utility to get token

export default function EditCarBrand() {
  const [form, setForm] = useState({
    brandId: 0,
    brandName: "",
    countryOfOrigin: "",
    foundedYear: "",
    logoUrl: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandId = searchParams.get("modelId");



  const fetchCarBrandById = async (brandId: number) => {
    try {
      const token = tokenService.getToken();
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      
      const response = await fetch(`http://localhost:9090/admin/getCarBrandById/${brandId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch car brand. Status: ${response.status}`);
      }
      const handleEditCarBrand = (brandId: number) => {
        console.log("Edit Car Brand button clicked!");
        router.push(`/admin/car_brands/edit_car_brand?modelId=${brandId}`);
      };
      const res = await response.json();
      setForm(res.data);
    } catch (error) {
      console.error("Error fetching car brand:", error);
      alert("Could not load car brand data. Please try again later.");
    }
  };

  // If brandId is not available, redirect or show an error
  useEffect(() => {
    if (!brandId) {
      setMessage("Invalid or missing car brand ID.");
      router.push("/admin/car_brands"); // Redirect to car brand list if no brandId
    }
  }, [brandId, router]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = tokenService.getToken();
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9090/admin/updateCarBrand/${brandId}`, // Use dynamic brandId for the update
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setMessage("Car brand updated successfully!");
        setTimeout(() => router.push("/admin/car_brands"), 2000); // Redirect to car brand list page
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message || "Failed to update car brand."}`);
      }
    } catch (error) {
      setMessage("Error: Unable to update car brand.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 mt-5 mb-5">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <div className="card" style={{ borderRadius: "15px" }}>
          <div className="card-body p-5">
            <h2 className="d-flex justify-content-center mb-5">Edit Car Brand</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
                <input
                  type="text"
                  name="brandName"
                  className="form-control"
                  value={form.brandName}
                  onChange={handleChange}
                  placeholder="Brand Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="countryOfOrigin"
                  className="form-control"
                  value={form.countryOfOrigin}
                  onChange={handleChange}
                  placeholder="Country of Origin"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="foundedYear"
                  className="form-control"
                  value={form.foundedYear}
                  onChange={handleChange}
                  placeholder="Founded Year"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="url"
                  name="logoUrl"
                  className="form-control"
                  value={form.logoUrl}
                  onChange={handleChange}
                  placeholder="Logo URL"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="description"
                  className="form-control"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Car Brand
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
