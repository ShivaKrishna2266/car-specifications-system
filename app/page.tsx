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
    <div className="container-flued">
      {/* Carousel Section */}
      <div id="carCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://lcarizona.com/wp-content/uploads/2021/01/Huracan_Performante_1920x700.jpg"
              className="d-block w-100 carousel-img"
              alt="Car Display 1"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Organize</h1>
              <p>fun driving and social events local and with other LCA chapters..</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://lcarizona.com/wp-content/uploads/2021/01/gran-turismo-concept-1920x700-1.jpg"
              className="d-block w-100 carousel-img"
              alt="Car Display 2"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Promote</h1>
              <p>the Lamborghini lifestyle and image with the general public.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/gateway/limited_series/2024/s/limited_s2_02.jpg"
              className="d-block w-100 carousel-img "
              alt="Car Display 3"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Improve</h1>
              <p>communication and services available to fellow Lamborghini owners
                .</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://lcarizona.com/wp-content/uploads/2021/01/centenario-1920x700-1.jpg"
              className="d-block w-100 carousel-img "
              alt="Car Display 3"
            />
            {/* <div className="carousel-caption d-none d-md-block">
              <h1>Premium Rentals</h1>
              <p>Drive the best without the commitment.</p>
            </div> */}
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
      {/* <div className="container">
        <div className="row mt-5">
          
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
      </div> */}

      {/* Shop By Brand Section */}
      {/* <div className="container mt-5">
       
        <h1 className="text-center text-uppercase mb-4">Shop By Brand</h1>
        <div className="text-end text-decoration-underline"><b>Total Brands: {brands.length}</b></div><br />

        
        <div className="row">
          {currentBrands.map((brand) => (
            <div className="col-md-3 mb-4" key={brand.brandId}>
              <div className="card h-100 shadow-sm">
                
                <img
                  src={"https://tse4.mm.bing.net/th?id=OIP.XQ6CyncXgEdljRssh_LAIwHaEK&pid=Api&P=0&h=180"}
                  className="card-img-top"
                  alt={brand.brandName}
                  style={{ height: "180px", objectFit: "contain", }}
                />

                
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <h5 className="card-title mb-3">{brand.brandName}</h5>

                 
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

      </div> */}


      <div className="welcome">
        <div className="container p-5 ">
          <h1>Welcome to the LAMB-bros Lamborghini Club of America</h1>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row align-items-start mt-5 mb-5">
          {/* Left Image */}
          <div className="col-md-36 col-sm-6 mb-4">
            <img
              src="https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/f/g/a/small-spos14461-poster-lamborghini-huracan-lamborghini-black-car-original-imagkb9bba3mdbr7.jpeg?q=90&crop=false"
              className="d-block content_image img-fluid rounded"
              alt="Car Display"
            />
          </div>

          {/* Center Text */}
          <div className="col-md-6 col-sm-6 mb-4">
            <h2 className="text-center text-white ">LAMBORGHINI</h2>
            <p className="text-white">
              Welcome to the home of LAMB-bros  Lamborghini Club America (LCA), a community of Lamborghini owners and enthusiasts who are passionate about the Lamborghini brand and the thrill of the bull on the road. <br /><br />
              Our mission is to be ambassadors of Lamborghini delivering a fulfilling and inclusive experience that connects our regional Arizona Lamborghini community to our national Lamborghini Club America family and home to our Italian roots at the heart of Sant’Agata Bolognese – the Automobili Lamborghini factory. <br /><br />
              Become an active member of Lamborghini Club America by participating in your local region. By being an active member, you are able to influence what your region plans and hosts throughout the year by contributing your ideas, and helping to plan and organize regional activities.
            </p>
          </div>

        </div>

        <h5 className="text-white fw-bold mb-5">
          Lamborghini owners are known for their enjoyment of good wine, fine food, quality functions and a friendliness that is unmatched in the automotive world. The Club is open to all owners and enthusiasts.<br /><br />
          If you are interested in learning more and staying informed about club activities please register your email here or by clicking the Register button on the right. We would love to hear from you!
        </h5>

        <div className="row align-items-start mt-5 mb-5">
          {/* Center Text */}
          <div className="col-md-6 col-sm-6 mb-4">
            <h2 className="text-center text-white mt-5 mb-5">REVUELTO</h2>
            <p className="text-white">
              The Revuelto is the beginning of a new era for Lamborghini, who has harnessed the power of hybridization technology to create the first HPEV (High Performance Electrified Vehicle). <br />
              Responding to the need for sustainability and powerful performance, the Lamborghini Revuelto rewrites all paradigms and represents a technical masterpiece beyond anyone’s imagination. <br /> The iconic V12 engine finds a new life in this futuristic automotive masterwork that delivers unparalleled performance and driving emotions.
            </p>
          </div>
          {/* Left Image */}
          <div className="col-md-36 col-sm-6 mb-4">
            <img
              src="https://www.supercars.net/blog/wp-content/uploads/2024/10/Lamborghini-Current-Models-1024x736.png"
              className="d-block content_image img-fluid rounded"
              alt="Car Display"
            />
          </div>
        </div>


      </div><hr />

      <div className="container mt-5 text-white">
        <h2 className="fw-bold">Upcoming Events:</h2>

        <div className="row mt-5">
          <div className="col-md-6 col-sm-6 mb-4">
            <ul className="fw-bold">Lone Mountain Toybarn C&C</ul>
            <img
              src="https://lcarizona.com/wp-content/uploads/2023/08/lone-mountain-candc-150x150.jpg"
              className="d-block img-fluid rounded mb-2"
              alt="Car Display"
            />
            <p>Join us every 4th Saturday of the month at the Toy Barn on Lone Mountain in Cave Creek, AZ. Coffee, breakfast including hundreds of cars and amazing garages makes this…</p>
            <h4 className="fw-bold">April 26 @ 7:00 am – 9:00 am MST</h4>
          </div>

          <div className="col-md-6 col-sm-6 mb-4">
            <ul className="fw-bold">Highline Autos Cars & Coffee</ul>
            <img
              src="https://lcarizona.com/wp-content/uploads/2022/09/sshot-128-150x150.jpg"
              className="d-block  img-fluid rounded mb-2"
              alt="Car Display"
            />
            <p>If there is no LCA event going on this is a great place to meet hundreds of car enthusiasts! Highline Autos Cars & Coffee at High Street! 400+ Exotic, Classic,…</p>
            <h4 className="fw-bold">May 3 @ 7:30 am – 10:00 am MST</h4>
          </div>
        </div>
      </div>

      <div className="container mt-5">

        <h2 className="text-white text-center"> Modern / Marketing Style</h2>
        <div className="row">
          <div className="col-md-6 col-sm-6 mt-5 text-white text-center">
            <img
              src="https://static.pakwheels.com/2018/01/Lamborghini-Terzo_Millennio_Concept-2017-1024-01.jpg"
              className="d-block img-fluid_1 rounded mb-2"
              alt="Car Display"
            />
            <h5>19 December 2024</h5>
            <h2>Automobili Lamborghini and Italian State Police: 20 years together</h2>
            <p>The vehicle is not yet offered for sale and is therefore not subject to Directive 1999/94/EC. The fuel consumption and emissions data is in the type approval stage</p>

            <button className="btn btn-primery ">READ MORE</button>
          </div>
          <div className="col-md-6 col-sm-6 mt-5 text-white text-center">
            <img
              src="https://m.media-amazon.com/images/I/61PQ5aLKoRL._AC_UF894,1000_QL80_.jpg"
              className="d-block img-fluid_1 rounded mb-2"
              alt="Car Display"
            />

            <h5>4 December 2024</h5>
            <h2>Movember 2024: Lamborghini's commitment to prevention</h2>
            <p>The vehicle is not yet offered for sale and is therefore not subject to Directive 1999/94/EC. The fuel consumption and emissions data is in the type approval stage</p>

            <button className="btn btn-primery ">READ MORE</button>
          </div>
        </div>
      </div>


      <div className=" container row mt-5">
        <h2 className="text-white text-center mb-5">Sponsors and Partners:</h2>
        <div className="row d-flex justify-content-center mb-5">
        <div className="col-md-4 col-sm-4 text-center mb-4 mt-2">
          <img
            src="https://lcarizona.com/wp-content/uploads/2021/06/sshot-94.jpg"
            className=""
            alt="Partners 1"
          />
        </div>

        <div className="col-md-4 col-sm-4 mb-4">
          <img
            src="https://lcarizona.com/wp-content/uploads/2021/06/sshot-95.jpg"
            className=""
            alt="Partners 2"
          />
        </div>

        <div className="col-md-4 col-sm-4 mb-4">
          <img
            src="https://lcarizona.com/wp-content/uploads/2021/06/sshot-96.jpg"
            className="  "
            alt="Partners 3"
          />
        </div>
        </div>
      </div>

    </div>
  );
}
