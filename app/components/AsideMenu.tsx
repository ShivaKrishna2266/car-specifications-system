import React, { useState, useEffect } from 'react';

interface AsideMenuProps {
  onBrandClick: (brandName: string) => void; // Function to handle brand click
}

async function fetchBrands() {
  try {
    const res = await fetch(`http://localhost:9090/user/getAllCarBrand`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch car brands. Status: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching car brands:', error);
    return [];
  }
}

export default function AsideMenu({ onBrandClick }: AsideMenuProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBrands = async () => {
      setLoading(true);
      try {
        const fetchedBrands = await fetchBrands();
        if (Array.isArray(fetchedBrands)) {
          setBrands(fetchedBrands.map((brand: any) => brand.brandName));
        } else if (fetchedBrands && fetchedBrands.data) {
          setBrands(fetchedBrands.data.map((brand: any) => brand.brandName));
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch brands');
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  return (
    <aside className="col-md-3 bg-light">
      <h5 className="mb-3">Categories</h5>
      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p className="text-danger">{error}</p>} {/* Display error message */}
      <ul className="list-group">
        {brands.map((brandName) => (
          <li
            key={brandName}
            className="list-group-item list-group-item-action"
            onClick={() => onBrandClick(brandName)} 
            style={{ cursor: 'pointer' }}
          >
            {brandName}
          </li>
        ))}
      </ul>
    </aside>
  );
}
