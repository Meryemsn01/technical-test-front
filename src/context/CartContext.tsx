'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Product } from '@/lib/api';

export interface LocalOrder {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  clearCart: () => void; // NOUVEAU
  checkout: () => void; // NOUVEAU
  cartTotal: number; // NOUVEAU
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const saveLocalOrders = (orders: LocalOrder[]) => {
  localStorage.setItem('local_orders', JSON.stringify(orders));
};
const getLocalOrders = (): LocalOrder[] => {
  const data = localStorage.getItem('local_orders');
  return data ? JSON.parse(data) : [];
};


export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    alert(`"${product.title}" a été ajouté au panier !`);
  };

  const clearCart = () => { // NOUVEAU
    setCartItems([]);
  };

  const checkout = () => { // NOUVEAU
    if (cartItems.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    const newOrder: LocalOrder = {
      id: new Date().getTime().toString(), // ID unique basé sur le temps
      date: new Date().toISOString(),
      items: cartItems,
      total: cartTotal,
    };
    const existingOrders = getLocalOrders();
    saveLocalOrders([...existingOrders, newOrder]);
    alert("Commande validée !");
    clearCart();
  };

  // NOUVEAU : On calcule le total du panier
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);


  const value = { cartItems, addToCart, clearCart, checkout, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}