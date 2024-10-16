import AsideMenu from '../components/AsideMenu';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './ProductsPage.css';
import React from 'react';

// Fetch product data directly in the component
/*async function fetchProducts() {
  try {
    const res = await fetch('https://api.example.com/products', { cache: 'no-store' }); // Replace with a valid API URL
    if (!res.ok) {
      throw new Error(`Failed to fetch product data. Status: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw new Error('Failed to fetch product data. Please try again later.');
  }
}*/

export default async function ProductsPage() {
  const products = new Array(); //await fetchProducts();
  return (
    <div className="">
      <Header />

      <div className="container">
        <div className="row">
          <AsideMenu />
          <main className="col-md-9">
            <h2 className="mb-4">Products List</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {products.map((product, index) => (
                <div className="col" key={index}>
                  <div className="card h-100">
                    <img src={product.imageUrl} className="card-img-top" alt="Product Image" />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <a href="#" className="btn btn-primary">View Details</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

      <Footer />
    </div>
  );
}
