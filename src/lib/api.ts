const BASE = process.env.NEXT_PUBLIC_API_BASE || "https://dummyjson.com";

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}


export type ProductsResponse = { products: Product[]; total: number; skip: number; limit: number };
export type CartsResponse = { carts: Cart[]; total: number; skip: number; limit: number };
export type UsersResponse = { users: any[]; total: number; skip: number; limit: number };


export async function fetchProducts(page: number = 1): Promise<ProductsResponse> {
  const limit = 12;
  const skip = (page - 1) * limit;
  const response = await fetch(`${BASE}/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  const response = await fetch(`${BASE}/products/search?q=${query}`);
  if (!response.ok) {
    throw new Error("Failed to search products");
  }
  return response.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE}/products/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

export async function fetchProductsByCategory(category: string, page: number = 1): Promise<ProductsResponse> {
  const limit = 12;
  const skip = (page - 1) * limit;
  const response = await fetch(`${BASE}/products/category/${category}?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }
  return response.json();
}

export async function fetchCarts(page: number = 1): Promise<CartsResponse> {
  const limit = 10;
  const skip = (page - 1) * limit;
  const response = await fetch(`${BASE}/carts?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error("Failed to fetch carts");
  }
  return response.json();
}

/** TODO: implémentez fetchUsers(limit, skip) */
export async function fetchUsers(limit = 10, skip = 0): Promise<UsersResponse> {
  throw new Error("TODO: fetchUsers non implémenté");
}