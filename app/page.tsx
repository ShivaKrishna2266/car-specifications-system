import React from 'react';
import Script from 'next/script';
import './globals.css';

export default function HomePage() {
  return (
    <div className="">
      {/* <h1 className="text-center">Welcome to the Car Specification System</h1> */}
      <div id="carCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://t3.ftcdn.net/jpg/08/68/87/14/240_F_868871426_pbtuxaZrRsBgAeCaZQbTAKFNnuXucZvd.jpg"
              className="d-block w-100 img-fluid"
              alt="Car 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fcar-slider&psig=AOvVaw0ZnJsJCmVmNNZORfhpaS0s&ust=1729834852297000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCzmJGnpokDFQAAAAAdAAAAABAE"
              className="d-block w-100 img-fluid"
              alt="Car 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-psd/car-rental-automotive-facebook-cover-template_106176-2481.jpg?t=st=1729748829~exp=1729752429~hmac=c68834d2177aaeec9b44f903a25994c75e1a7db55e032404741c2e8ba5870533&w=1380"
              className="d-block w-100 img-fluid"
              alt="Car 3"
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

      <div className="row mt-5">
        {/* <h1 className="text-center ">Revolutionizing Pre-loved Car Buying and Selling Experience!</h1> */}
        <div className="text-center col-md-4 mt-4">
          <div className="aboutTrueValue">
            <h2>About True Value</h2>
            <div className="card mt-3 mb-3">
              <img
                src="https://cdn.prod.website-files.com/607ee530dd59915d46108839/607ee530dd59919c6e108dbf_cover.avif"
                className="card-img-top" alt="Model Image" />
              <div className="detail"> <br></br>
                <h4>About Us</h4> <br></br>
                <p>Since foraying into India’s pre-owned car market in 2001, True Value, Maruti Suzuki’s channel for pre-owned cars, has grown in both size and stature. With 558  outlets spread across 279 cities, the new True Value caters to the diverse and burgeoning needs of pre-owned car buyers across the country.</p>
                <a href="#" data-wa-link="Buy &amp; Sell Used Cars, Second Hand Cars for Sale - True Value_undefined_Read More_undefined">Read More</a>
              </div>
            </div>

          </div>
          <div className='col-md-6'>
            <h4 className="text-center">About True Value</h4>
          </div>
        </div>

        <div className=" col-md-4 mt-3">
          <h2>From the Auto Experts</h2>
          <a href="#" target="_blank" data-wa-link="Buy Sell Used Cars, Second Hand Cars for Sale - True Value_undefined_View All_undefined">View All</a>
          <div className=" card">
            <div className="row">
              <div className="leftSection col-md-6">
                <img
                  src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="card-img-top"
                  alt="Model Image"
                />
              </div>
              <div className="rightSection col-md-6">
                <p>
                  What Makes Maruti Suzuki True Value A Trusted Name in the Pre-Owned Car Market?
                </p>
                <a href="#" className="readmore" target="_blank" data-wa-link="Buy Sell Used Cars, Second Hand Cars for Sale - True Value_undefined_Read More_undefined">Read More</a>
              </div>
            </div>

            <div className="row">
              <div className="leftSection col-md-6">
                <img
                  src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="card-img-top"
                  alt="Model Image"
                />
              </div>
              <div className="rightSection col-md-6">
                <p>5 Factors To Consider Before You Buy A Pre-Owned Car...</p>
                <a href="#" className="readmore" target="_blank" data-wa-link="Buy Sell Used Cars, Second Hand Cars for Sale - True Value_undefined_Read More_undefined">Read More</a>
              </div>
            </div>


            <div>
              <h2>Blog</h2>
              <a href="/truevaluehub/blogs" target="_blank" data-wa-link="Buy Sell Used Cars, Second Hand Cars for Sale - True Value_undefined_View All_undefined">View All</a>

              <div className="row">
                <div className="leftSection col-md-6 mb-3">
                  <img
                    src="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="card-img-top"
                    alt="Model Image"
                  />
                </div>
                <div className="rightSection col-md-6">
                  <p>What Makes Used Cars More Affordable?</p>
                  <a href="#" className="readmore" target="_blank" data-wa-link="Buy Sell Used Cars, Second Hand Cars for Sale - True Value_undefined_Read More_undefined">Read More</a>
                </div>
              </div>

              <div className="row">
                <div className="leftSection  col-md-6 mt-3">
                  <img
                    src="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="card-img-top"
                    alt="Model Image"
                  />
                </div>
                <div className="rightSection col-md-6">
                  <p>Your Guide to Buying a Used Car in India</p>
                  <a href="#" className="readmore" target="_blank" data-wa-link="Buy Sell Used Cars, Second Hand Cars for Sale - True Value_undefined_Read More_undefined">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="col-md-4 mt-4">
          <div className="trueValueAdvantages">
            <h2>The True Value Advantages</h2>
            <div className="card mt-4">
              <img
                src="https://t3.ftcdn.net/jpg/08/68/87/14/240_F_868871426_pbtuxaZrRsBgAeCaZQbTAKFNnuXucZvd.jpg"
                className="card-img-top w-100 img-fluid"
                alt="Car 1"
              />
              {/* <iframe width="100%" height="260px" style="display: none;" allowfullscreen="" src="" title="True Value Advantages" data-gtm-yt-inspected-8345729_1951="true" data-gtm-yt-inspected-8345729_115="true" data-gtm-yt-inspected-119="true" data-gtm-yt-inspected-124="true"></iframe> */}
            
            <div className="detail mt-4">
              <h2>True Value Advantages</h2><br />
              <p>At Maruti Suzuki True Value, the term ‘True Value’ takes on an all-important meaning. It is a sum of key aspects that every True Value certified pre-owned car adheres to, and value-adds that the car comes with, to ensure transparency, reliability and most importantly, customer delight.</p>
              <a href="#" data-wa-link="Buy &amp; Sell Used Cars, Second Hand Cars for Sale - True Value_undefined_Read More_undefined">Read More</a>
            </div>
          </div>
        </div>
        </div>

      </div>
      <div className=''>
        <h1>Shiva </h1>
      </div>


    </div>
  );
}
