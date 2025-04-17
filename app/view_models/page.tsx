"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CarModel {
  modelId: number;
  modelName: string;
  price:number;
  specifications:string;
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
      <h1>Models for Brand: {brandName}</h1>

      {loading ? (
        <p>Loading models...</p>
      ) : models.length === 0 ? (
        <p className="text-danger">No models based on this brand.</p>
      ) : (
        <div className="row">
          {models.map((model) => (
            <div className="col-md-4 mb-4" key={model.modelId}>
              <div className="card p-3 shadow">
              <img
                  src= "https://tse4.mm.bing.net/th?id=OIP.XQ6CyncXgEdljRssh_LAIwHaEK&pid=Api&P=0&h=180"
                  className="card-img-top"
                  alt={model.modelName}
                  style={{ height: "180px", objectFit: "contain", padding: "10px" }}
                />
                <h2>{model.modelName}</h2>
                <h3>{model.price}</h3>
                <h3>{model.specifications}</h3>
                <button
                          className="btn btn-primary"
                          onClick={() => handleViewDeatailsClick(model)}
                        >
                          View Details
                        </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
