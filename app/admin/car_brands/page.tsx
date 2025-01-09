"use client";

import tokenService from "@/app/tokenService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Brand {
  brandId: number;
  brandName: string;
  countryOfOrigin: string;
  foundedYear: number;
  logoUrl: string;
  description: string;
}

export default function ViewCarBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [formData, setFormData] = useState<Brand>({
    brandId: 0,
    brandName: '',
    countryOfOrigin: '',
    foundedYear: 0,
    logoUrl: '',
    description: ''
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandId = searchParams?.get("modelId");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(brands.length / recordsPerPage);
    // Get current page data
  const currentRecords = brands.slice(
      (currentPage - 1) * recordsPerPage,
      currentPage * recordsPerPage
   );
  // Handle page change
   const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
     setCurrentPage(pageNumber);
  };

  const fetchBrandData = async () => {
    try {
      const token = tokenService.getToken();

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      console.log("Authorization Token:", token);

      const response = await fetch('http://localhost:9090/admin/getAllCarBrand', {

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }

      const res = await response.json();
      console.log("Fetched Data:", res.data);
      setBrands(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Could not load products. Please try again later.");
    }
  };

  const handleAddCarBrand = () => {
    console.log("Add Car Brand button clicked!");
    router.push('/admin/car_brands/add_car_brand');
  };

  const handleEditCarBrand = (brandId: number) => {
    alert(`Edit Car Brand with ID: ${brandId}`);
    router.push(`/admin/car_brands/edit_car_brand?modelId=${brandId}`);
  };

  useEffect(() => {
    fetchBrandData();
  }, []);

  console.log("Brands State:", brands);


  return (
    <div className="card container">
      <div>
        <button type="button" className="btn btn-primary mr-10" onClick={handleAddCarBrand} > Add Car Brands </button>
      </div>

      <table className="table table-bordered mt-5">
        <thead className="table-light">
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th><p>CountryOfOrigin</p></th>
            <th>Founded Year</th>
            <th>Logo Url</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {currentRecords.length > 0 ? (
            currentRecords.map((brand, index) => (
              <tr key={brand.brandId}>
                <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                <td>{brand.brandName}</td>
                <td>{brand.countryOfOrigin}</td>
                <td>{brand.foundedYear}</td>
                <td>{brand.logoUrl}</td>
                <td>{brand.description}</td>
                <td>
                <FaEdit 
                    className="text-warning me-2 action-icon" 
                    onClick={() => handleEditCarBrand(brand.brandId)} 
                  />
                  <FaTrash className="text-danger action-icon" onClick={() => { }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No products available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <nav>
          <ul className="pagination">
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <button className="page-link">Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                <button className="page-link">{i + 1}</button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
