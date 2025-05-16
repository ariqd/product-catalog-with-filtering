'use client'

import ProductGrid from "@/components/product/ProductGrid";
import ProductFilter from "@/components/product/ProductFilter";
import ProductGridHeader from "@/components/product/ProductGridHeader";
import { fetchProducts } from "./utils/api";
import { useProductStore } from "./store/productStore";
import { useCallback, useEffect } from "react";

export default function Home() {
  const { setProducts, setError } = useProductStore();

  const getProducts = useCallback(async () => {
    try {
      const products = await fetchProducts();
      if (products) {
        setProducts(products);
      }
    } catch (error) {
      setError(error);
    }
  }, [setProducts, setError]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4">
        <ProductFilter />
      </div>
      <div className="col-span-3 p-4">
        <ProductGridHeader />
        <ProductGrid />
      </div>
    </div>
  );
}
