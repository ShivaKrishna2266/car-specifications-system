// app/cart-details/page.tsx
"use client"; // Ensure this is marked as a Client Component

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const CartDetails = () => {
  const { cartItems, getTotalPrice, removeFromCart } = useCart();
  const router = useRouter();

  // Handle order logic (e.g., integrating Razorpay)
  const handleOrder = async () => {
    const totalPrice = getTotalPrice();
    try {
      // Placeholder: Add Razorpay integration or order processing logic here
      alert(`Order placed successfully! Total: ${totalPrice} Rupees`);
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cart Details</h2>

      {/* Display an alert if the cart is empty */}
      {
      cartItems.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          Your cart is empty! <button onClick={() => router.push("/")} className="btn btn-link">Go Shopping</button>
        </div>
      ) : 
      (
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
                <tr key={item.modelId || index}>
                  <td>{item.modelName || "N/A"}</td>
                  <td>{item.specifications || "N/A"}</td>
                  <td>{item.price || 0}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>
              Total Price:{" "}
              <span className="text-success">{getTotalPrice()} Rupees</span>
            </h4>
            <button onClick={handleOrder} className="btn btn-primary">
              Order Car
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDetails;
