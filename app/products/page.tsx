import React from 'react';
import './ProductsPage.css';

export default function ProductsPage() {
  return (
    <div className="">
      {/* Header */}
      <header className="bg-dark text-white p-3 mb-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <a href="/">
              <img src="https://www.designrush.com/uploads/users/customer-11/image_1526487017_D4nHpYcQEqJIECHp7VuoM7UR9XJw8GdGB0wdshls.png" alt="Logo" className="me-3" style={{ height: '50px' }} />
            </a>
            {/* <h1 className="h3 mb-0">Enterprise Application</h1> */}

            {/* Navigation */}
            <nav className="mt-3 d-flex justify-content-center">
              <a href="/" className="text-white me-3">Home</a>
              <a href="./products" className="text-white me-3">Products</a>
              <a href="#" className="text-white me-3">About Us</a>
              <a href="#" className="text-white">Contact</a>
            </nav>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </header>


      <div className="container">
        <div className="row">
          {/* Aside Menu */}
          <aside className="col-md-3 bg-light ">
            <h5 className="mb-3">Categories</h5>
            <ul className="list-group">
              <li className="list-group-item">Jaguar</li>
              <li className="list-group-item">Audi</li>
              <li className="list-group-item">Ferrari</li>
              <li className="list-group-item">BMW</li>
              <li className="list-group-item">Porsche</li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="col-md-9">
            <h2 className="mb-4">Products List</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card h-100">
                  <img src="https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="Product Image" />
                  <div className="card-body">
                    <h5 className="card-title">Product 1</h5>
                    <p className="card-text">Description of product 1.</p>
                    <a href="#" className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <img src="https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="Product Image" />
                  <div className="card-body">
                    <h5 className="card-title">Product 2</h5>
                    <p className="card-text">Description of product 2.</p>
                    <a href="#" className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <img src="https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="Product Image" />
                  <div className="card-body">
                    <h5 className="card-title">Product 3</h5>
                    <p className="card-text">Description of product 3.</p>
                    <a href="#" className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-4">
        <div className="">
          <p className="mb-0">&copy; 2024 Enterprise Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
