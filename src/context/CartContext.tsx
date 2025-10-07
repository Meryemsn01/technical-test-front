'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { getLocalOrders, saveLocalOrders } from '@/lib/localOrders'; 
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
  clearCart: () => void; 
  checkout: () => void; 
  cartTotal: number; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);



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

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    const newOrder: LocalOrder = {
      id: new Date().getTime().toString(),
      date: new Date().toISOString(),
      items: cartItems,
      total: cartTotal,
    };
    const existingOrders = getLocalOrders();
    saveLocalOrders([...existingOrders, newOrder]);
    alert("Commande validée !");
    clearCart();
  };

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