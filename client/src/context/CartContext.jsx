import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);
const savedCart = JSON.parse(localStorage.getItem('pizzaflow-cart') || '[]');

export function CartProvider({ children }) {
  const [cart, setCart] = useState(savedCart);

  const addItem = (item) => {
    setCart((current) => {
      const next = [...current, { ...item, cartId: `${Date.now()}-${Math.random().toString(36).slice(2)}` }];
      localStorage.setItem('pizzaflow-cart', JSON.stringify(next));
      return next;
    });
  };

  const updateItem = (cartId, patch) => {
    setCart((current) => {
      const next = current.map((item) => (item.cartId === cartId ? { ...item, ...patch } : item));
      localStorage.setItem('pizzaflow-cart', JSON.stringify(next));
      return next;
    });
  };

  const removeItem = (cartId) => {
    setCart((current) => {
      const next = current.filter((item) => item.cartId !== cartId);
      localStorage.setItem('pizzaflow-cart', JSON.stringify(next));
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('pizzaflow-cart');
  };

  const value = useMemo(
    () => ({
      cart,
      count: cart.length,
      addItem,
      updateItem,
      removeItem,
      clearCart
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};

