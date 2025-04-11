"use client";

import "./globals.css";
import { useEffect, useState } from "react";

// Define the type for a brand
interface Brand {
  brandId: number;
  brandName: string;
  countryOfOrigin: string;
  foundedYear: number;
  logoUrl: string;
  description: string;
}

export default function HomePage() {
  const [brands, setBrands] = useState<Brand[]>([]); // Explicitly set the type

  useEffect(() => {
    // Fetch data from API
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:9090/data/getAllCarBrand");

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

    fetchBrands();
  }, []);


  return (
    <div>
      {/* Carousel Section */}
      <div id="carCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://t3.ftcdn.net/jpg/08/68/87/14/240_F_868871426_pbtuxaZrRsBgAeCaZQbTAKFNnuXucZvd.jpg"
              className="d-block w-100 img-fluid"
              alt="Car Display 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-vector/luxury-car-advertisement-banner-template_1268-13318.jpg"
              className="d-block w-100 img-fluid"
              alt="Car Display 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-psd/car-rental-automotive-facebook-cover-template_106176-2481.jpg"
              className="d-block w-100 img-fluid"
              alt="Car Display 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* About Section */}
      <div className="container ">
        <div className="row mt-5">
          <div className="col-md-4 mt-4 text-center">
            <h2>About True Value</h2>
            <div className="card mt-3 mb-3">
              <img
                src="https://cdn.prod.website-files.com/607ee530dd59915d46108839/607ee530dd59919c6e108dbf_cover.avif"
                className="card-img-top"
                alt="True Value About"
              />
              <div className="card-body">
                {/* <h4>About Us</h4> */}
                <p>Since foraying into India’s pre-owned car market in 2001, True Value has grown in both size and stature, with 558 outlets across 279 cities.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-4">
            <h2>From the Auto Experts</h2>
            <div className="card mt-3">
              <div className="">
                <div className="col-md-">
                  <img
                    src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"
                    className="card-img-top"
                    alt="Expert Tip 1"
                  />
                </div>
                <div className="col-md-">
                  <p>What Makes Maruti Suzuki True Value A Trusted Name in the Pre-Owned Car Market?</p>
                  <a href="#" target="_blank">Read More</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-4">
            <h2>The Advantages</h2>
            <div className="card mt-3">
              <img
                src="https://t3.ftcdn.net/jpg/08/68/87/14/240_F_868871426_pbtuxaZrRsBgAeCaZQbTAKFNnuXucZvd.jpg"
                className="card-img-top w-100 img-fluid"
                alt="True Value Advantages"
              />
              <div className="card-body">
                <p>
                  At Maruti Suzuki True Value, the term ‘True Value’ takes on an all-important meaning, ensuring transparency, reliability, and customer delight.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Shop By Brand Section */}
        <div className="container mt-5">
          <h1 className="text-center">Shop By Brand</h1>
          <div className="row mt-4">
            {brands.map((brand) => (
              <div className="col-md-3 mb-4" key={brand.brandId}>
                <div className="card">
                  <img
                    src="https://tse4.mm.bing.net/th?id=OIP.XQ6CyncXgEdljRssh_LAIwHaEK&pid=Api&P=0&h=180"
                    className="card-img-top"
                    alt={brand.brandName}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{brand.brandName}</h5>
                    {/* <p className="card-text text-center">{brand.description}</p> */}
                    {/* <h6 className="card-text text-center">{brand.countryOfOrigin}</h6> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
     
    </div>

  );
}
