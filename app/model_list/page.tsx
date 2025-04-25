'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface CarModelDetails {
  modelId: number;
  modelName: string;
  price: number;
  specifications: string;
}

export default function ModelDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [modelDetails, setModelDetails] = useState<CarModelDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchModelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9090/data/getCarModelById/${id}`);
        const result = await response.json();

        if (response.ok && result.status === 200) {
          setModelDetails(result.data); // ✅ use result.data
        } else {
          console.error("Backend error:", result.message);
        }
      } catch (error) {
        console.error("Error fetching model details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModelDetails();
  }, [id]);

  if (loading) return <div>Loading model details...</div>;
  if (!modelDetails) return <div>No model found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{modelDetails.modelName}</h1>
      <p className="text-lg">Price: ₹{modelDetails.price}</p>
      <p className="text-lg">Specifications: {modelDetails.specifications}</p>
    </div>
  );
}
