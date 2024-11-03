// app/components/Cart.tsx
"use client";

import { useCart } from '../context/CartContext';
import Link from 'next/link';

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <Link href="/cart">
        <button className="btn btn-outline-light">
          Cart ({cartItems.length})
        </button>
      </Link>
    </div>
  );
};

export default Cart;
