// app/cart-details/page.tsx
"use client"; // Ensure this is marked as a Client Component

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext'; 

const CartDetails = () => {
  const { cartItems, getTotalPrice } = useCart();
  const router = useRouter();

  const handleOrder = async () => {
    const totalPrice = getTotalPrice();
    // Implement the order logic and Razorpay integration here
    // For example, you could open the Razorpay checkout here
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cart Details</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          Your cart is empty!
        </div>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>Model Name</th>
                <th>Specifications</th>
                <th>Price (Rupees)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.modelName}</td>
                  <td>{item.specifications}</td>
                  <td>{item.price}</td>
                  <td>
                    {/* Add any action buttons if necessary, for now just an empty cell */}
                    <button className="btn btn-danger btn-sm" disabled>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Total Price: <span className="text-success">{getTotalPrice()} Rupees</span></h4>
            <button onClick={handleOrder} className="btn btn-primary">Order Car</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDetails;
