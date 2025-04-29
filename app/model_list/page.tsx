'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface CarModel {
  modelId: number;
  modelName: string;
  price: number;
  specifications: string;
}

export default function ModelDetailPage() {
  const router = useRouter();
  const { modelId } = router.query;
  const [model, setModel] = useState<CarModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!modelId) return;

    const fetchModel = async () => {
      try {
        const res = await fetch(`http://localhost:9090/data/getCarModelById/${modelId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error fetching model");

        setModel(data.data); // assuming `data.data` contains the model object
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [modelId]);

  if (loading) return <div>Loading model details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!model) return <div>No model found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{model.modelName}</h1>
      <p><strong>Price:</strong> ${model.price}</p>
      <p><strong>Specifications:</strong> {model.specifications}</p>
    </div>
  );
}
