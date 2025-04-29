'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface CarModel {
  modelId: number;
  modelName: string;
  price: number;
  specifications: string;
}

const Models = () => {
  const [models, setModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:9090/data/getAllCarModels");
        const res = await response.json();

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        setModels(res.data);
      } catch (error) {
        console.error("Error fetching models:", error);
        setError("Could not load models.");
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) return <div>Loading car models...</div>;
  if (error) return <div>{error}</div>;

  const handleViewModelsClick = (modelName: string) => {
    router.push(`/model_list/${modelName}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Available Car Models</h2>
      <ul className="space-y-2 text-lg">
        {models.map((model) => (
          <li
            key={model.modelId}
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => router.push(`/model_list/${model.modelId}`)}
          >
            {model.modelName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Models;
