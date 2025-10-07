'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchCarts, Cart } from '@/lib/api';

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


export default function Orders() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['carts'],
    queryFn: () => fetchCarts(1),
  });

  if (isLoading) {
    return <div className="card text-center">Chargement des commandes...</div>;
  }

  if (isError) {
    return <div className="card text-red-500">Erreur: {error.message}</div>;
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Commandes (Carts)</h2>
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
            {data?.carts.map((cart) => (
              <OrderRow key={cart.id} cart={cart} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}