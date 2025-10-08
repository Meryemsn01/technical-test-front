'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { cartItems, cartTotal, checkout, clearCart } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 relative">
      <div className="container py-4 flex items-center gap-6">
        <Link href="/" className="font-semibold text-lg">
          Visionyze
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/products">Produits</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/metrics">Métriques</Link>
        </nav>
        
        <div className="ml-auto flex items-center gap-4">
          <button 
            className="btn text-sm"
            onClick={() => setIsCartVisible(!isCartVisible)}
          >
            Panier ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </button>
          <div className="text-xs opacity-70">DummyJSON</div>
        </div>
      </div>
      
      {isCartVisible && (
        <div className="absolute top-full right-0 container">
          <div className="card mt-2 float-right w-full max-w-sm">
            {cartItems.length > 0 ? (
              <>
                <h3 className="font-semibold mb-2">Mon Panier</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span>{item.title} (x{item.quantity})</span>
                      <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
                <hr className="my-3 dark:border-gray-700"/>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={checkout} className="btn btn-primary flex-grow">Valider</button>
                  <button onClick={clearCart} className="btn">Vider</button>
                </div>
              </>
            ) : (
              <p className="text-center text-sm text-gray-500">Votre panier est vide.</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}