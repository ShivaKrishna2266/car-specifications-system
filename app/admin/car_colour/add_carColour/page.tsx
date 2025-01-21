"use client";

import tokenService from "@/app/tokenService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddCarColour() {
  const [message, setMessage] = useState("");
  const [carModel, setCarModel] = useState<any[]>([]);
  const router = useRouter();
  const [form, setForm] = useState({
    colourName: "",
    modelId: "",
    createdBy: tokenService.getUsername(),
  });

  // Fetch car models on component mount
  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const token = tokenService.getToken();
        if (!token) {
          setMessage("Authentication required. Please log in.");
          return;
        }

        const response = await fetch(
          "http://localhost:9090/admin/getAllCarModels",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch car models.");
        }

        const res = await response.json();
        setCarModel(res.data || []); // Assuming response contains `data`
      } catch (error) {
        console.error("Error fetching car models:", error);
        setMessage("Unable to load car models.");
      }
    };

    fetchCarModels();
  }, []); // Empty dependency array ensures this runs only once

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCarColour = {
      colourName: form.colourName,
      modelId: Number(form.modelId),
      createdBy: form.createdBy,
    };

    try {
      const token = tokenService.getToken();
      if (!token) {
        setMessage("Error: No authorization token found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:9090/admin/addCarColour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCarColour),
      });

      if (response.ok) {
        setMessage("Car Colour added successfully!");
        setForm({ colourName: "", modelId: "", createdBy: tokenService.getUsername() });
        router.push("/admin/car_colour"); // Navigate to the desired page
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to add car colour."}`);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
      console.error("Error adding car colour:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 mt-5 mb-5">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <div className="card" style={{ borderRadius: "15px" }}>
          <div className="card-body p-5">
            <h2 className="d-flex justify-content-center mb-5">Add Car Colour</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="colourName">Colour Name</label>
                <input
                  type="text"
                  id="colourName"
                  name="colourName"
                  className="form-control"
                  value={form.colourName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="modelId">Car Model</label>
                <select
                  name="modelId"
                  className="form-control"
                  value={form.modelId}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Car Model
                  </option>
                  {carModel.map((model) => (
                    <option key={model.modelId} value={model.modelId}>
                      {model.modelName}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                Add Car Colour
              </button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
