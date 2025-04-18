"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CarModel {
  modelId: number;
  modelName: string;
  price: number;
  specifications: string;
  brandId: number;


  // 🔑 Key Features
  engine: string;
  transmission: string;
  infotainment: string;
  safety: string;

  // 🚗 Vehicle Details
  fuelType: string;
  bodyType: string;
  seatingCapacity: number;
  colorOptions: string;

  // 💰 Price Details
  exShowroomPrice: number;
  onRoadPrice: number;
  insurance: number;
  emiOption: string;

  // 🖼️ Additional
  imageUrl: string;
  isAvailable: boolean;
}


export default function ViewModels() {
  const searchParams = useSearchParams();
  const brandName = searchParams.get('brand');
  const router = useRouter();

  const [models, setModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (brandName) {
      const fetchModels = async () => {
        try {
          const response = await fetch(`http://localhost:9090/data/getAllModelsByBrandId/${brandName}`);
          const res = await response.json();
          setModels(res.data || []);
        } catch (error) {
          console.error('Error fetching models:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchModels();
    }
  }, [brandName]);

  const handleViewDeatailsClick = (model: any) => {
    localStorage.setItem('selectedCarModel', JSON.stringify(model));
    router.push('/viewdetails');
  };

  return (
    <div className="container mt-5">
  {/* Page title with dynamic brand name */}
  <h1 className="mb-4 text-center text-uppercase">
    Models for Brand: <span className="text-primary">{brandName}</span>
  </h1>

  {/* Loading message */}
  {loading ? (
    <p className="text-center">Loading models...</p>
  ) : models.length === 0 ? (
    // Show message if no models found
    <p className="text-center text-danger">No models available for this brand.</p>
  ) : (
    // Show model cards
    <div className="row">
      {models.map((model) => (
        <div className="col-md-4 mb-4" key={model.modelId}>
          <div className="card shadow h-100">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.XQ6CyncXgEdljRssh_LAIwHaEK&pid=Api&P=0&h=180"
              className="card-img-top"
              alt={model.modelName}
              style={{ height: "180px", objectFit: "contain", padding: "10px" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{model.modelName}</h5>
              <p className="card-text text-success"><strong>Price:</strong> ₹{model.price}</p>
              <p className="card-text"><strong>Specifications:</strong> {model.specifications}</p>
              <button className="btn btn-outline-primary mt-2" onClick={() => handleViewDeatailsClick(model)}>
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
}
