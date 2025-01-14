"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import tokenService from "@/app/tokenService"; // Utility to get token

export default function EditCarModel() {
  const [form, setForm] = useState({
    modelName: "",
    price: "",
    specifications: "",
    brandId: "",
  });

  const [brands, setCarBrands] = useState<any[]>([]); // Brands is an array of objects
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const modelId = searchParams.get("modelId");

  // Fetch car model data by ID
  const fetchCarModelById = async (modelId: string) => {
    try {
      const token = tokenService.getToken();
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      const response = await fetch(`http://localhost:9090/admin/getCarModelById/${modelId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch car model. Status: ${response.status}`);
      }

      const res = await response.json();
      setForm(res.data);
    } catch (error) {
      console.error("Error fetching car model:", error);
      alert("Could not load car model data. Please try again later.");
    }
  };

  // Load car model data when the component mounts
  useEffect(() => {
    const initialize = async () => {
      if (modelId) {
        await fetchCarBrands(); // Fetch car brands before fetching the car model
        fetchCarModelById(modelId);
      } else {
        setMessage("Invalid or missing car model ID.");
        setTimeout(() => router.push("/admin/car_model"), 3000);
      }
    };
    initialize();
  }, [modelId, router]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  

  // Load car brands data
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = tokenService.getToken();
    if (!token) {
      setMessage("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9090/admin/updateCarModel/${modelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage("Car model updated successfully!");
        setTimeout(() => router.push("/admin/car_model"), 2000); // Redirect to car model list page
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message || "Failed to update car model."}`);
      }
    } catch (error) {
      setMessage("Error: Unable to update car model.");
      console.error("Error:", error);
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
