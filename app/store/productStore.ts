import { create } from "zustand";
import { Category, Product } from "../types/product";

const url = "https://dummyjson.com";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedCategories: Category[];
  priceRange: [number, number]; // [min, max]
  minRating: number;
  setProducts: (products: Product[]) => void;
  toggleSelectedCategory: (categories: Category) => void;
  setPriceRange: (range: [number, number]) => void;
  setMinRating: (rating: number) => void;
  applyFilters: () => void;
  isLoading: boolean;
  error: string | null;
  setError: (error: unknown) => void;
  resetSelectedCategory: () => void;
  sortKey: 'price' | 'rating' | '';
  sortOrder: 'asc' | 'desc' | '';
  setSorting: (sortKey?: '' | 'price' | 'rating', sortOrder?: 'asc' | 'desc' | '') => void;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => void;
}

type PriceStore = {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  priceRange: [0, Infinity],
  minRating: 0,
  isLoading: true,
  error: null,
  selectedCategories: [],
  sortKey: '',
  sortOrder: '',
  setProducts: (products) => {
    set({ products, isLoading: false });
  },
  setPriceRange: (range) => {
    set({ priceRange: range });
    get().applyFilters();
  },
  setMinRating: (rating) => {
    set({ minRating: rating });
    get().applyFilters();
  },
  applyFilters: () => {
    const { products, selectedCategories, priceRange, minRating } = get();
    const filtered = products.filter((product) => {
      const inCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          product.category.includes(category.slug)
        );
      const inPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const meetsRating = product.rating >= minRating;
      return inCategory && inPrice && meetsRating;
    });

    set({ filteredProducts: filtered });
  },
  setError: (error) => {
    set({
      error:
        error instanceof Error ? error.message : "An unknown error occured",
    });
  },
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

    get().applyFilters();
  },
  resetSelectedCategory: () => {
    set({ selectedCategories: [] });
    get().applyFilters();
  },
  setSorting: (sortKey?: 'price' | 'rating' | '', sortOrder?: 'asc' | 'desc' | '') => {
    set({ sortKey: sortKey || '', sortOrder: sortOrder || '' });
  }
}));

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,
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

export const usePriceStore = create<PriceStore>((set) => ({
  priceRange: [0, 1000], // default range
  setPriceRange: (range) => set({ priceRange: range }),
}));
