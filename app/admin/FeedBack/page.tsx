"use client";

import tokenService from "@/app/tokenService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface FeedBack {
  feedbackId: number;
  rating: string;
  description: string;
  brandId: number;
  modelId: number;
  userId: number;
}

interface Brand {
  brandId: number;
  brandName: string;
}

interface Model {
  modelId: number;
  modelName: string;
}

export default function ViewFeedBacks() {
  const [feedBack, setFeedBacks] = useState<FeedBack[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(feedBack.length / recordsPerPage);
  const currentRecords = feedBack.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleAddFeedBack = () => {
    console.log("Navigating to AddCarModel page");
    router.push("/admin/FeedBack");
  };

  const fetchFeedBackData = async () => {
    try {
      const token = tokenService.getToken();
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:9090/admin/getAllFeedbacks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }

      const res = await response.json();
      setFeedBacks(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Could not load products. Please try again later.");
    }
  };

  // Fetch brand names, model names, and user names
  const fetchBrands = async () => {
    try {
      const token = tokenService.getToken();
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      const response = await fetch("http://localhost:9090/admin/getAllCarBrand",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }
      const res = await response.json();
      setBrands(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Could not load products. Please try again later.");
    }
  }

  const fetchModels = async () => {

    try {
      const token = tokenService.getToken();
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      const response = await fetch("http://localhost:9090/admin/getAllCarModels",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }
      const res = await response.json();
      setModels(res.data);
    }
    catch (error) {
      console.error("Error fetching products:", error);
      alert("Could not load products. Please try again later.");
    }
  }

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:9090/admin/getAllUsers");
    const res = await response.json();
    setUsers(res.data);
  };

  const getNameById = (id: number, type: string) => {
    if (type === "brand") {
      const brand = brands.find((brand) => brand.brandId === id);
      return brand ? brand.brandName : "Unknown";
    } else if (type === "model") {
      const model = models.find((model) => model.modelId === id);
      return model ? model.modelName : "Unknown";
    } else if (type === "user") {
      const user = users.find((user) => user.id === id);
      return user ? user.name : "Unknown";
    }
    return "Unknown";
  };

  useEffect(() => {
    fetchFeedBackData();
    fetchBrands();
    fetchModels();
    fetchUsers();
  }, []);

  function handleEditCarModel(feedbackId: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="card container">
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddFeedBack}
        >
          Add Feed Back
        </button>
      </div>
      <div className="table-responsive mt-5">
      <table className="table table-bordered">
        <thead className="table-light ">
          <tr>
            <th>S No</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Brand Name</th>
            <th>Model Name</th>
            <th>User Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((feedBack, index) => (
              <tr key={feedBack.feedbackId}>
                <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                <td>{feedBack.rating}</td>
                <td>{feedBack.description}</td>
                <td>{getNameById(feedBack.brandId, "brand")}</td>
                <td>{getNameById(feedBack.modelId, "model")}</td>
                <td>{getNameById(feedBack.userId, "user")}</td>
                <td>
                  <FaEdit
                    className="text-warning me-2 action-icon"
                    onClick={() => handleEditCarModel(feedBack.feedbackId)}
                  />
                  <FaTrash
                    className="text-danger action-icon"
                    onClick={() => { }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No feedbacks available</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
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
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(i + 1)}
              >
                <button className="page-link">{i + 1}</button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""
                }`}
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
