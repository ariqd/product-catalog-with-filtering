import { create } from "zustand";
import { Product, ProductsResponse } from "../types/product";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    isLoading: false,
    error: null,
    fetchProducts: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch('https://dummyjson.com/products?limit=100');

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data: ProductsResponse = await response.json();

            set({
                products: data?.products,
                isLoading: false
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'An unknown error has occured',
                isLoading: false
            })
        }
    },
}));