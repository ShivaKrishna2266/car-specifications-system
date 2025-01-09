"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import tokenService from "@/app/tokenService";

export default function EditCarModel() {
  const [form, setForm] = useState({
    modelId: "",
    modelName: "",
    price: "",
    specifications: "",
    carBrandId: "",
    createdBy: tokenService.getUsername(),
  });

  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.modelId) {
      setMessage("Please enter a valid Model ID.");
      return;
    }

    const updatedProduct = {
      ...form,
      price: Number(form.price),
      carBrandId: Number(form.carBrandId),
    };

    try {
      const token = tokenService.getToken();

      if (!token) {
        setMessage("Authentication required. Please log in.");
        return;
      }

      const response = await fetch(
        `http://localhost:9090/admin/updateCarModel/${form.modelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        setMessage("Car model updated successfully!");
        setTimeout(() => {
          router.push("/admin/car_model");
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(
          `Error: ${errorData.message || "Failed to update car model"}`
        );
      }
    } catch (error) {
      setMessage(`Error: Unable to connect to the server. ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 mt-5 mb-5">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <div className="card" style={{ borderRadius: "15px" }}>
          <div className="card-body p-5">
            <h2 className="d-flex justify-content-center mb-5">Edit Car Model</h2>
            {message && (
              <div
                className={`alert ${
                  message.includes("Error") ? "alert-danger" : "alert-success"
                }`}
              >
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
                <input
                  type="text"
                  name="modelId"
                  className="form-control"
                  value={form.modelId}
                  onChange={handleChange}
                  placeholder="Enter Model ID"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="modelName"
                  className="form-control"
                  value={form.modelName}
                  onChange={handleChange}
                  placeholder="Enter Model Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="specifications"
                  className="form-control"
                  value={form.specifications}
                  onChange={handleChange}
                  placeholder="Enter Specifications"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="carBrandId"
                  className="form-control"
                  value={form.carBrandId}
                  onChange={handleChange}
                  placeholder="Enter Car Brand ID"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Car Model
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
