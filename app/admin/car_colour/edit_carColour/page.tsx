"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import tokenService from "@/app/tokenService";


export default function EditCarColour() {
  const [form, setForm] = useState({
    colourName: "",
    carModelId: "",
  });
  const [carModels, setCarModels] = useState({
    modelId: "",
    modelName: "",
    price: "",
    specifications: "",
    brandId: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const colourId = searchParams.get("colourId"); // Use 'colourId' as query param

  // Fetch car models for dropdown
  const fetchCarModels = async () => {
    try {
      const token = tokenService.getToken();
      if (!token) {
        setMessage("Authentication required.");
        return;
      }

      const response = await fetch("http://localhost:9090/admin/getAllCarModels", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch car models.");
      }

      const res = await response.json();
      setCarModels(res.data || []); // Assuming response contains `data`
    } catch (error) {
      console.error("Error fetching car models:", error);
      setMessage("Unable to load car models.");
    }
  };

  // Fetch car colour details by ID
  const fetchCarColourById = async (colourId: string | null) => {
    if (!colourId) {
      setMessage("Invalid or missing car colour ID.");
      return;
    }

    try {
      const token = tokenService.getToken();
      if (!token) {
        setMessage("Authentication required.");
        return;
      }

      const response = await fetch(
        `http://localhost:9090/admin/getCarColourById/${colourId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch car colour data.");
      }

      const res = await response.json();
      setForm(res.data); // Assuming the API response has a `data` field
    } catch (error) {
      console.error("Error fetching car colour:", error);
      setMessage("Could not load car colour data. Please try again later.");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await fetchCarModels();
      if (colourId) {
        await fetchCarColourById(colourId);
      } else {
        setMessage("Invalid or missing car colour ID.");
        setTimeout(() => router.push("/admin/car_colour"), 3000);
      }
      setLoading(false);
    };
    initialize();
  }, [colourId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!colourId) {
      setMessage("Invalid car colour ID. Cannot update.");
      return;
    }

    const token = tokenService.getToken();
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9090/admin/updateCarColour/${colourId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setMessage("Car colour updated successfully!");
        setTimeout(() => router.push("/admin/car_colour"), 2000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to update car colour"}`);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
      console.error("Error updating car colour:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

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
                <select
                  name="carModelId"
                  className="form-control"
                  value={form.carModelId}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Car Model
                  </option>
                  {carModels.map((model) => (
                    <option key={model.modelId} value={model.modelId}>
                      {model.modelName}
                    </option>
                  ))}
                </select>
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
