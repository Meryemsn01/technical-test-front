'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProducts, Product } from '@/lib/api'; 

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-3 flex flex-col text-center shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        className="w-full h-32 object-cover mb-3 rounded" 
      />
      <h3 className="font-semibold flex-grow">{product.title}</h3>
      <p className="text-lg font-bold mt-2">{product.price} €</p>
    </div>
  );
}

export default function Products() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(1),
  });

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Produits</h2>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input className="input" placeholder="Recherche…" />
        <select className="input max-w-xs">
          <option>Toutes catégories</option>
        </select>
      </div>
      
      
      {isLoading && <div className="skeleton h-24 w-full mb-3" />}
      
      {isError && (
        <div className="text-red-500 p-4 border border-red-500 rounded-lg">
          Erreur: {error.message}
        </div>
      )}

      {data && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mt-4">
        <button className="btn">Préc.</button>
        <div className="text-sm">Page X / Y</div>
        <button className="btn">Suiv.</button>
      </div>
    </div>
  );
}