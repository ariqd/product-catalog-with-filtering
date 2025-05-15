import { create } from "zustand";
import { Category, Product, ProductsResponse } from "../types/product";

const url = 'https://dummyjson.com';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    isLoading: false,
    error: null,
    fetchProducts: async () => {
        set({ isLoading: true, error: null });

        await new Promise((resolve) => setTimeout(resolve, 5000));

        try {
            const response = await fetch(`${url}/products?limit=100`);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data: ProductsResponse = await response.json();

            set({ products: data?.products, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'An unknown error has occured',
                isLoading: false
            })
        }
    },
}));

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    isLoading: false,
    error: null,
    fetchCategories: async () => {
        set({ isLoading: true, error: null });

        await new Promise((resolve) => setTimeout(resolve, 5000));

        try {
            const response = await fetch(`${url}/products/categories`);

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data: [] = await response.json();

            set({ categories: data, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'An unknown error has occured',
                isLoading: false
            })
        }
    },
}));