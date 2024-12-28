"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const params = useParams();
  console.log("Params:", params);
  const modelId = Array.isArray(params?.modelId) ? params?.modelId[0] : params?.modelId;
  console.log("Model ID:", modelId);


  useEffect(() => {
    if (modelId) {
      fetchCarModelData(modelId);
    } else {
      setMessage("Invalid or missing model ID.");
    }
  }, [modelId]);

  const fetchCarModelData = async (modelId: string) => {
    if (!modelId) {
      setMessage("Cannot fetch data for an invalid model ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9090/admin/getCarModel/${modelId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch car model data");
      }

      const carModel = await response.json();
      setForm({
        modelId: carModel.modelId || "",
        modelName: carModel.modelName || "",
        price: carModel.price?.toString() || "",
        specifications: carModel.specifications || "",
        carBrandId: carModel.carBrandId?.toString() || "",
        createdBy: tokenService.getUsername(),
      });
    } catch (error) {
      setMessage("Error fetching car model data.");
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
    const updatedProduct = {
      ...form,
      price: Number(form.price),
      carBrandId: Number(form.carBrandId),
    };

    if (!modelId) {
      setMessage("Invalid model ID. Cannot update car model.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9090/admin/updateCarModel/${modelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setMessage("Car model updated successfully!");
        router.push("/admin/car_model/view-car-models");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to update car model"}`);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
      console.error("Error updating car model:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 mt-5 mb-5">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <div className="card" style={{ borderRadius: "15px" }}>
          <div className="card-body p-5">
            <h2 className="d-flex justify-content-center mb-5">Edit Car Model</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
                <textarea
                  name="specifications"
                  className="form-control"
                  value={form.specifications}
                  onChange={handleChange}
                  placeholder="Specifications"
                  required
                />
              </div>
              <div className="mb-3">
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
