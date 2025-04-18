"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useRouter } from "next/navigation";
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Brand {
  brandId: number;
  brandName: string;
  countryOfOrigin: string;
  foundedYear: number;
  logoUrl: string;
  description: string;
}

export default function HomePage() {
  const [brands, setBrands] = useState<Brand[]>([]);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const brandsPerPage = 8;

  useEffect(() => {
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

  const handleViewModelsClick = (brandName: string) => {
    router.push(`/view_models?brand=${encodeURIComponent(brandName)}`);
  };


  // Pagination Logic
  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);
  const totalPages = Math.ceil(brands.length / brandsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Carousel Section */}
      <div id="carCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://t3.ftcdn.net/jpg/08/68/87/14/240_F_868871426_pbtuxaZrRsBgAeCaZQbTAKFNnuXucZvd.jpg"
              className="d-block w-100 carousel-img"
              alt="Car Display 1"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Luxury and Speed</h1>
              <p>Experience the thrill of modern design and performance.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg"
              className="d-block w-100 carousel-img"
              alt="Car Display 2"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Premium Rentals</h1>
              <p>Drive the best without the commitment.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 carousel-img "
              alt="Car Display 3"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Premium Rentals</h1>
              <p>Drive the best without the commitment.</p>
            </div>
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
      <div className="container">
        <div className="row mt-5">
          {/* Card 1 */}
          <div className="col-md-4 mt-4 d-flex flex-column">
            <h2 className="text-center">About True Value</h2>
            <div className="card mt-3 mb-3 h-100 d-flex flex-column">
              <img
                src="https://cdn.prod.website-files.com/607ee530dd59915d46108839/607ee530dd59919c6e108dbf_cover.avif"
                className="card-img-top"
                alt="True Value About"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <p className="flex-grow-1">
                  Since foraying into India’s pre-owned car market in 2001, True Value has grown in both size and stature, with 558 outlets across 279 cities.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mt-4 d-flex flex-column">
            <h2 className="text-center">From the Auto Experts</h2>
            <div className="card mt-3 h-100 d-flex flex-column">
              <img
                src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg"
                className="card-img-top"
                alt="Expert Tip"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <p className="flex-grow-1">
                  What Makes Maruti Suzuki True Value A Trusted Name in the Pre-Owned Car Market?
                </p>
                <a href="#" target="_blank">Read More</a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mt-4 d-flex flex-column">
            <h2 className="text-center">The Advantages</h2>
            <div className="card mt-3 h-100 d-flex flex-column">
              <img
                src="https://t3.ftcdn.net/jpg/08/68/87/14/240_F_868871426_pbtuxaZrRsBgAeCaZQbTAKFNnuXucZvd.jpg"
                className="card-img-top"
                alt="True Value Advantages"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <p className="flex-grow-1">
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
        {/* Page Heading */}
        <h1 className="text-center text-uppercase mb-4">Shop By Brand</h1>
        <div className="text-end text-decoration-underline"><b>Total Brands: {brands.length}</b></div><br />

        {/* Brand Cards */}
        <div className="row">
          {currentBrands.map((brand) => (
            <div className="col-md-3 mb-4" key={brand.brandId}>
              <div className="card h-100 shadow-sm">
                {/* Brand Logo */}
                <img
                  src={"https://tse4.mm.bing.net/th?id=OIP.XQ6CyncXgEdljRssh_LAIwHaEK&pid=Api&P=0&h=180"}
                  className="card-img-top"
                  alt={brand.brandName}
                  style={{ height: "180px", objectFit: "contain", }}
                />

                {/* Brand Name */}
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <h5 className="card-title mb-3">{brand.brandName}</h5>

                  {/* View Models Button */}
                  <button
                    onClick={() => handleViewModelsClick(brand.brandName)}
                    className="btn btn-outline-primary mt-auto"
                  >
                    View Models
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <nav>
          <ul className="pagination justify-content-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>


        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <img
                  src="https://assets.fastly.carvana.io/home-assets/nba/promo_cvt.png"
                  alt="Car Value"
                  className=""
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title">Stay up to speed on your car's value</h5>
                  <p className="card-text">
                    Get personalized insights on your car's value and track it over time with Carvana Value Tracker.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <img
                  src="https://assets.fastly.carvana.io/home-assets/redesign/insurance-promo_103023.png"
                  alt="Insurance"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title">Insurance coverage in 3 clicks™</h5>
                  <p className="card-text">
                    Effortless to buy and personalized to you, introducing Carvana Insurance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
