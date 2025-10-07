'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchCarts, Cart } from '@/lib/api';
import { getLocalOrders } from '@/lib/localOrders';
import { LocalOrder } from '@/context/CartContext';
import { useState, useEffect } from 'react';

function OrderRow({ cart }: { cart: Cart }) {
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="p-3">{cart.id}</td>
      <td className="p-3">{cart.userId}</td>
      <td className="p-3">{cart.totalProducts}</td>
      <td className="p-3">{cart.totalQuantity}</td>
      <td className="p-3 font-semibold">{cart.discountedTotal} €</td>
    </tr>
  );
}

function LocalOrderRow({ order }: { order: LocalOrder }) {
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="p-3">{new Date(order.date).toLocaleString('fr-FR')}</td>
      <td className="p-3">{order.items.length}</td>
      <td className="p-3">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
      <td className="p-3 font-semibold">{order.total.toFixed(2)} €</td>
    </tr>
  );
}

export default function Orders() {
  const { data: apiCartsData, isLoading, isError, error } = useQuery({
    queryKey: ['carts'],
    queryFn: () => fetchCarts(1),
  });

  const [localOrders, setLocalOrders] = useState<LocalOrder[]>([]);
  useEffect(() => {
    setLocalOrders(getLocalOrders());
  }, []);

  if (isError) {
    return <div className="card text-red-500">Erreur: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Commandes de l'API (DummyJSON)</h2>
        {isLoading ? <div className="skeleton h-20 w-full" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase">
                <tr>
                  <th className="p-3">ID Commande</th>
                  <th className="p-3">ID Utilisateur</th>
                  <th className="p-3">Produits</th>
                  <th className="p-3">Quantité</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {apiCartsData?.carts.map((cart) => (
                   <tr key={cart.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-3">{cart.id}</td>
                        <td className="p-3">{cart.userId}</td>
                        <td className="p-3">{cart.totalProducts}</td>
                        <td className="p-3">{cart.totalQuantity}</td>
                        <td className="p-3 font-semibold">{cart.discountedTotal} €</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Mes Commandes Locales</h2>
        {localOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Produits Uniques</th>
                  <th className="p-3">Quantité Totale</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {localOrders.map((order) => (
                  <LocalOrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            Vous n'avez pas encore passé de commande.
          </p>
        )}
      </div>
    </div>
  );
}