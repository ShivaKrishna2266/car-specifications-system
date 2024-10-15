export default function ProductsPage() {
  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="bg-primary text-white p-3 mb-4">
        <div className="container">
          <h1 className="h3">Enterprise Application</h1>
          <nav className="d-flex justify-content-between">
            <a href="/" className="text-white me-3">Home</a>
            <a href="./products" className="text-white me-3">Products</a>
            <a href="#" className="text-white me-3">About Us</a>
            <a href="#" className="text-white">Contact</a>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="row">
          {/* Aside Menu */}
          <aside className="col-md-3 bg-light p-3">
            <h5 className="mb-3">Categories</h5>
            <ul className="list-group">
              <li className="list-group-item">Electronics</li>
              <li className="list-group-item">Software</li>
              <li className="list-group-item">Books</li>
              <li className="list-group-item">Office Supplies</li>
              <li className="list-group-item">Other Products</li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="col-md-9">
            <h2 className="mb-4">Products List</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card h-100">
                  <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product Image" />
                  <div className="card-body">
                    <h5 className="card-title">Product 1</h5>
                    <p className="card-text">Description of product 1.</p>
                    <a href="#" className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product Image" />
                  <div className="card-body">
                    <h5 className="card-title">Product 2</h5>
                    <p className="card-text">Description of product 2.</p>
                    <a href="#" className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <img src="https://via.placeholder.com/150" className="card-img-top" alt="Product Image" />
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
        <div className="container">
          <p className="mb-0">&copy; 2024 Enterprise Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
