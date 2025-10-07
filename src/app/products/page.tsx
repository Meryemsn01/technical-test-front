'use client';

import { useState, useEffect } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/context/CartContext';

import { 
  fetchProducts, 
  Product, 
  fetchCategories, 
  searchProducts, 
  fetchProductsByCategory 
} from '@/lib/api';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-3 flex flex-col text-center shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        className="w-full h-32 object-cover mb-3 rounded" 
      />
      <h3 className="font-semibold flex-grow">{product.title}</h3>
      <p className="text-lg font-bold mt-2">{product.price} €</p>
      <button 
        className="btn mt-3 text-sm"
        onClick={() => addToCart(product)}
      >
        Ajouter au panier
      </button>
    </div>
  );
}

export default function Products() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');             
  const debouncedSearchQuery = useDebounce(searchQuery, 500);           

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page, selectedCategory, debouncedSearchQuery], 
    queryFn: () => {
      if (debouncedSearchQuery) {
        return searchProducts(debouncedSearchQuery);
      }
      if (selectedCategory !== 'all') {
        return fetchProductsByCategory(selectedCategory, page);
      }
      return fetchProducts(page);
    },
    placeholderData: (previousData) => previousData,
  });

  const totalPages = data ? Math.ceil(data.total / 12) : 0;
  
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [selectedCategory, debouncedSearchQuery]);

  if (isError) {
    return <div className="card text-red-500">Erreur: {error.message}</div>;
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Produits</h2>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input 
          className="input flex-grow" 
          placeholder="Rechercher un produit..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className="input max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={!!searchQuery}
        >
          <option value="all">Toutes catégories</option>
          {categoriesData?.map(category => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      {isLoading && <div className="text-center py-10">Chargement...</div>}

      {data && data.products.length > 0 && !isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {data && data.products.length === 0 && !isLoading && (
        <div className="text-center py-10 text-gray-500">
          Aucun produit ne correspond à vos critères.
        </div>
      )}

      {!debouncedSearchQuery && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            className="btn" 
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Préc.
          </button>
          <div className="text-sm font-medium">
            Page {page} / {totalPages}
          </div>
          <button 
            className="btn"
            onClick={() => setPage(prev => prev + 1)}
            disabled={!data || page === totalPages}
          >
            Suiv.
          </button>
        </div>
      )}
    </div>
  );
}