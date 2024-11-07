'use client';
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import "./register.css";
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [roles, setRoles] = useState([]);
  const roles1 = [
    { id: 1, value: 'ROLE_ADMIN', name: 'ADMIN' },
    { id: 2, value: 'ROLE_USER', name: 'USER' },
    // more roles
  ];
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    role: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:9090/data/getAllRoles");  // Adjust endpoint as needed
        if (response.ok) {
          const data = await response.json();
          setRoles(data);  // Store roles in the state
        } else {
          console.error("Failed to fetch roles");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { username, email, mobile, role, password, agreeToTerms } = formData;

    try {
      const response = await fetch("http://localhost:9090/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, mobile, role, password, agreeToTerms }),
      });

      const contentType = response.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        console.log("Registration successful:", data);
        alert("Registration successful!");
      } else {
        data = await response.text();  // Handle text response
        console.log("Registration successful:", data);
        alert("Registration successful! Message: " + data);
      }

      if (role === "ROLE_ADMIN") {
        router.push('/admin');
      } else {
        router.push('/products');
      }

    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <section
      className="vh-50 bg-image"
      style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="tel"
                        id="form3ExampleMobile"
                        className="form-control form-control-lg"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="form3ExampleMobile">Mobile Number</label>
                    </div>

                    <div className="form-outline mb-4">
                      <select
                        id="roleSelect"
                        className="form-control form-control-lg"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Role</option>
                        {roles1.map((role) => (
                          <option key={role.id} value={role.value}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" htmlFor="roleSelect">Role</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree to all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Already have an account?{' '}
                      <Link href="/login" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
