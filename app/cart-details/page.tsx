"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CartDetails = () => {
  const { cartItems, getTotalPrice, removeFromCart } = useCart();
  const router = useRouter();

  const handleOrder = async () => {
    const totalPrice = getTotalPrice();
    try {
      alert(`Order placed successfully! Total: ₹${totalPrice}`);
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-5"><b>Your Shopping Cart</b></h1>
      <div className="row">
        {/* Left Column - Cart Items */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">{cartItems.length > 0 ? (<>{cartItems.map((item, i) => (
              <div key={item.modelId || i}>
                <div className="row cart-item mb-3">
                  <div className="col-md-3">
                    <img
                      //  src={item.imageUrl || "/default-car.jpg"}
                      alt={item.modelName} className="img-fluid rounded" />
                  </div>
                  <div className="col-md-4">
                    <h5 className="card-title">{item.modelName}</h5>
                    {/* <p className="text-muted">Type: {item.type || "General"}</p> */}
                    <p>{item.specifications || "No specifications provided"}</p>
                  </div>
                  <div className="col-md-3 d-flex align-items-center">
                    <p className="fw-bold mb-0">₹{item.price}</p>
                  </div>
                  <div className="col-md-2 text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item)}>
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            ))}
            </>
            ) : (
              <p className="text-center text-muted">
                Your cart is empty.{" "}
                <button className="btn btn-link" onClick={() => router.push("/")} >Go Shopping </button>
              </p>
            )}
            </div>
          </div>

          <div className="text-start mb-4">
            <button className="btn btn-outline-primary" onClick={() => router.push("/products")} >
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </button>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="col-lg-4">
          <div className="card cart-summary">
            <div className="card-body">
              <h3 className="card-title mb-4"><b>Order Summary</b></h3>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>₹10.00</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <span>₹20.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>₹{getTotalPrice() + 10 + 20}</strong>
              </div>
              <h5><b>Taxes, discounts and shipping calculated at checkout</b></h5>
              <button className="btn btn-primary w-100" onClick={handleOrder}> Proceed to Checkout </button>
            </div>
          </div>

          {/* Promo Code Card */}
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Apply Promo Code</h5>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter promo code" />
                <button className="btn btn-outline-secondary" type="button">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;



