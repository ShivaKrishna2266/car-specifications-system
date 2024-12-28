"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import tokenService from "@/app/tokenService";

export default function EditCarBrand() {
  const [form, setForm] = useState({
    brandName: "",
    countryOfOrigin: "",
    foundedYear: "",
    logoUrl: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id"); // Access the `id` from query parameters.

  useEffect(() => {
    if (id) {
      fetchCarBrandData(id);
    }
  }, [id]);

  const fetchCarBrandData = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:9090/admin/getCarBrand/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch car brand data");
      }

      const carBrand = await response.json();
      setForm({
        brandName: carBrand.brandName || "",
        countryOfOrigin: carBrand.countryOfOrigin || "",
        foundedYear: carBrand.foundedYear?.toString() || "",
        logoUrl: carBrand.logoUrl || "",
        description: carBrand.description || "",
      });
    } catch (error) {
      setMessage("Error fetching car brand data.");
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBrand = {
      ...form,
      foundedYear: Number(form.foundedYear), // Ensure it's a number
    };

    try {
      const response = await fetch(`http://localhost:9090/admin/editCarBrand/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updatedBrand),
      });

      if (response.ok) {
        setMessage("Car brand updated successfully!");
        router.push("/admin/car_brand");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to update car brand"}`);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
      console.error("Error updating car brand:", error);
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
