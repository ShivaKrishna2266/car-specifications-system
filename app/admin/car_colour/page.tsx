"use client";

import tokenService from "@/app/tokenService";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface CarColour {
  colourId: number;
  colourName: string;
  carModelId: number;
}

export default function ViewCarColour() {
  const [carColours, setCarColours] = useState<CarColour[]>([]);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(carColours.length / recordsPerPage);
    // Get current page data
  const currentRecords = carColours.slice(
      (currentPage - 1) * recordsPerPage,
      currentPage * recordsPerPage
   );
  // Handle page change
   const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
     setCurrentPage(pageNumber);
  };

  // Function to fetch colour data
  const fetchColourData = async () => {
    try {
      const token = tokenService.getToken();

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      console.log("Authorization Token:", token);

      const response = await fetch("http://localhost:9090/admin/getAllCarColours", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch car colours. Status: ${response.status}`);
      }

      const res = await response.json();
      console.log("Fetched data:", res.data);
      setCarColours(res.data);
    } catch (error) {
      console.error("Error fetching car colours:", error);
      alert("Could not load car colours. Please try again later.");
    }
  };

  // Placeholder for adding a car colour
  const handleAddCarColour = () => {
    alert("Add Car Colour functionality will be implemented soon.");
    console.log("Navigating to EditCarModel page");
    router.push('/admin/car_colour/add_carColour');
    
  };

  // Placeholder for editing a car colour
  const handleEditCarColour = (colourId: number) => {
    alert(`Edit Car Colour with ID: ${colourId}`);
    router.push('/admin/car_colour/edit_carColour');
  };

  // Placeholder for deleting a car colour
  const handleDeleteCarColour = (colourId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car colour?");
    if (confirmDelete) {
      alert(`Delete Car Colour with ID: ${colourId}`);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchColourData();
  }, []); // Dependency array ensures this runs only once

  return (
    <div className=" card container ">
      <div>
        <button type="button" className="btn btn-primary mr-2" onClick={handleAddCarColour}>
          Add Car Colour
        </button>
      </div>
      <div className="table-responsive mt-5">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>S No</th>
              <th>Colour Name</th>
              <th>Model ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((carColour, index) => (
              <tr key={carColour.colourId}>
                <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                  <td>{carColour.colourName}</td>
                  <td>{carColour.carModelId}</td>
                  <td>
                    <FaEdit
                      className="text-warning me-2 action-icon"
                      onClick={() => handleEditCarColour(carColour.colourId)}
                    />
                    <FaTrash
                      className="text-danger action-icon"
                      onClick={() => handleDeleteCarColour(carColour.colourId)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No car colours available.
                </td>
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
    </div>
  );
}
