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

export type ProductsResponse = { products: Product[]; total: number; skip: number; limit: number };
export type CartsResponse = { carts: any[]; total: number; skip: number; limit: number };
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


/** TODO: implémentez fetchCarts(limit, skip) */
export async function fetchCarts(limit = 5, skip = 0): Promise<CartsResponse> {
  throw new Error("TODO: fetchCarts non implémenté");
}

/** TODO: implémentez fetchUsers(limit, skip) */
export async function fetchUsers(limit = 10, skip = 0): Promise<UsersResponse> {
  throw new Error("TODO: fetchUsers non implémenté");
}