"use client"; // Ensure this is a client component

import React, { createContext, useContext, useState, ReactNode } from 'react';  

// Define the structure of a cart item
interface CartItem {
  modelId: string;
  modelName: string;
  specifications: string;
  price: number;
}

// Define the context value type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemToRemove: CartItem) => void;
  getTotalPrice: () => number;
}

// Create the CartContext with a default value of null
const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemToRemove: CartItem) => {
    setCartItems((prevItems) => prevItems.filter(item => item.modelId !== itemToRemove.modelId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
