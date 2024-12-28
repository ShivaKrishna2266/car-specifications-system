"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import tokenService from "@/app/tokenService";

export default function EditCarColour() {
  const [form, setForm] = useState({
    colourName: "",
    carModelId: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id"); // Access the `id` from query parameters.

  useEffect(() => {
    if (id) {
      fetchCarColourData(id);
    }
  }, [id]);

  const fetchCarColourData = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:9090/admin/getCarColour/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch car colour data");
      }

      const carColour = await response.json();
      setForm({
        colourName: carColour.colourName || "",
        carModelId: carColour.carModelId?.toString() || "",
      });
    } catch (error) {
      setMessage("Error fetching car colour data.");
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedColour = {
      ...form,
      carModelId: Number(form.carModelId), // Ensure it's a number
    };

    try {
      const response = await fetch(`http://localhost:9090/admin/editCarColour/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updatedColour),
      });

      if (response.ok) {
        setMessage("Car colour updated successfully!");
        router.push("/admin/car_colour/view-car-colours");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to update car colour"}`);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
      console.error("Error updating car colour:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 mt-5 mb-5">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <div className="card" style={{ borderRadius: "15px" }}>
          <div className="card-body p-5">
            <h2 className="d-flex justify-content-center mb-5">Edit Car Colour</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
                <input
                  type="text"
                  name="colourName"
                  className="form-control"
                  value={form.colourName}
                  onChange={handleChange}
                  placeholder="Colour Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="carModelId"
                  className="form-control"
                  value={form.carModelId}
                  onChange={handleChange}
                  placeholder="Car Model ID"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Car Colour
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
