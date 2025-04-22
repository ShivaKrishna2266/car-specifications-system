'use client';

import React, { useEffect, useState } from 'react';
import './Models.css'

interface CarModel {
  modelId: number;
  modelName: string;
  price: number;
  specifications: string;
}

const Models = () => {
  const [models, setModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:9090/data/getAllCarModels");

        if (!response.ok) {
          throw new Error(`Failed to fetch models. Status: ${response.status}`);
        }

        const res = await response.json();
        console.log("Fetched Data:", res);
        setModels(res.data); // Assuming `res.data` contains the car models array
      } catch (error) {
        console.error("Error fetching models:", error);
        setError("Could not load models. Please try again later.");
      } finally {
        setLoading(false); // Make sure loading is set to false once the request finishes
      }
    };

    fetchModels();
  }, []); // Empty dependency array means this will run only once after the component mounts

  if (loading) {
    return <div>Loading car models...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
    <ul className="car-models-list space-y-2 text-lg text-gray-700">
      {models.length > 0 ? (
        models.map((model) => (
          <p key={model.modelId} className="bg-gray-100 p-4 rounded shadow hover:shadow-lg transition-shadow ">
            {model.modelName}
          </p>
        ))
      ) : (
        <p className="no-models-message text-gray-500">No car models available.</p>
      )}
    </ul>
  </div>
  
  );
};

export default Models;
