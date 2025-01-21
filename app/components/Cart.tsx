// app/components/Cart.tsx
"use client"; // This ensures the component is a client-side component

import { useCart } from '../context/CartContext';
import Link from 'next/link';

const Cart = () => {
  const { cartItems } = useCart(); // Access cart items from the CartContext

  return (
    <div>
      {/* Link to the cart page */}
      <Link href="/cart">
        <a>
          <button className="btn btn-outline-light">
            Cart ({cartItems.length})
          </button>
        </a>
      </Link>
    </div>
  );
};

export default Cart;
