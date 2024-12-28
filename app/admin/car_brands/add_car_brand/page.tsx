"use client";

import tokenService from "@/app/tokenService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import './addCarBrand.css'


export default function AddCarBrand() {

    const [formData, setFormData] = useState({
        brandName: "",
        countryOfOrigin: "",
        foundedYear: "",
        logoUrl: "",
        description: "",
        createdBy: tokenService.getUsername(),
    });

    const [messege, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = {
            brandName: formData.brandName,
            foundedYear: Number(formData.foundedYear),
            countryOfOrigin: formData.countryOfOrigin,
            logoUrl: formData.logoUrl,
            description: formData.description,
            createdBy: tokenService.getUsername(),
        };


        try {
            const response = await fetch("http://localhost:9090/admin/addCarBrand", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Adjust token retrieval as per your setup
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                setMessage("Car model added successfully!");
                setFormData({ brandName: '', countryOfOrigin: '', foundedYear: '', logoUrl: '', description: '', createdBy: '' });
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || "Failed to add car model"}`);
            }

            router.push('/admin/car_brands');
        } catch (error) {
            setMessage("Error: Unable to connect to the server.");
            console.error("Error adding car model:", error);
        }
    };


    return (

        <div className="d-flex justify-content-center align-items-center h-100 mt-5 mb-5">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                    <div className="card-body p-5">
                        <h2 className="d-flex justify-content-center mb-5">Add Car Brand</h2>
                        <form onSubmit={handleSubmit}>

                            <div className=" mt-4">
                                <input type="text" id="brandName" name="brandName" className="form-control" value={formData.brandName} onChange={handleChange} placeholder="Brand Name" required />
                            </div>

                            <div className="mt-4">
                                <input type="text" id="countryOfOrigin" name="countryOfOrigin" className="form-control" value={formData.countryOfOrigin} onChange={handleChange} placeholder="Country Of Origin" required />
                            </div>
                            <div className="mt-4">
                                <input type="number" id="foundedYear" name="foundedYear" className="form-control" value={formData.foundedYear} onChange={handleChange} placeholder="Founded Year" required />
                            </div>
                            <div className="mt-4">
                                <input type="text" id="logoUrl" name="logoUrl" className="form-control" value={formData.logoUrl} onChange={handleChange} placeholder="Logo Url" required />
                            </div>
                            <div className="mt-4">
                                <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleChange} placeholder="Description" required />
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary mr-10">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

