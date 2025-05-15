import { create } from "zustand";
import { Category, Product, ProductsResponse } from "../types/product";

const url = "https://dummyjson.com";

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
  selectedCategories: Category[];
  toggleSelectedCategory: (category: Category) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${url}/products`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: ProductsResponse = await response.json();

      set({ products: data?.products, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An unknown error has occured",
        isLoading: false,
      });
    }
  },
}));

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  selectedCategories: [],
  toggleSelectedCategory: (category: Category) => {
    set((state) => {
      const isSelected = state.selectedCategories.some(
        (selectedCategory) => selectedCategory.slug === category.slug
      );

      if (isSelected) {
        return {
          selectedCategories: state.selectedCategories.filter(
            (selectedCategory) => selectedCategory.slug !== category.slug
          ),
        };
      } else {
        return {
          selectedCategories: [...state.selectedCategories, category],
        };
      }
    });
  },
  fetchCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${url}/products/categories`);

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data: [] = await response.json();

      set({ categories: data, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An unknown error has occured",
        isLoading: false,
      });
    }
  },
}));
