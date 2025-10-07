import { LocalOrder } from "@/context/CartContext";

export const saveLocalOrders = (orders: LocalOrder[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('local_orders', JSON.stringify(orders));
  }
};

export const getLocalOrders = (): LocalOrder[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const data = localStorage.getItem('local_orders');
  return data ? JSON.parse(data) : [];
};