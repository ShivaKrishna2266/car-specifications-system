"use client";

import tokenService from "@/app/tokenService";
import { useRouter } from "next/navigation"; // Correct import for `useRouter` in Next.js 13+
import { useState } from "react";

export default function AddCarColour() {
    const [message, setMessage] = useState('');
    const router = useRouter();
    const [form, setForm] = useState({
        colourName: '',
        carModelId: '',
        createdBy: tokenService.getUsername(),
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newCarColour = {
            colourName: form.colourName,
            carModelId: Number(form.carModelId),
            createdBy: form.createdBy,
        };
        try {
            const token = tokenService.getToken();
            if (!token) {
                setMessage("Error: No authorization token found. Please log in.");
                return;
            }

            const response = await fetch("http://localhost:9090/admin/addCarColour", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newCarColour),
            });

            if (response.ok) {
                setMessage("Car Colour added successfully!");
                setForm({ colourName: '', carModelId: '', createdBy: tokenService.getUsername() });
                router.push('/admin/car_colour'); // Navigate to the desired page
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || "Failed to add car colour."}`);
            }
        } catch (error) {
            setMessage("Error: Unable to connect to the server.");
            console.error("Error adding car colour:", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center h-100 mt-5 mb-5">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                    <div className="card-body p-5">
                        <h2 className="d-flex justify-content-center mb-5">Add Car Brand</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="colourName">Colour Name</label>
                                <input
                                    type="text"
                                    id="colourName"
                                    name="colourName"
                                    className="form-control"
                                    value={form.colourName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="carModelId">Car Model ID</label>
                                <input
                                    type="number"
                                    id="carModelId"
                                    name="carModelId"
                                    className="form-control"
                                    value={form.carModelId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary mt-4">
                                Add Car Colour
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
