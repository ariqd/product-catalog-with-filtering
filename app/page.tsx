'use client'

import { useCallback, useEffect } from "react";
import { useProductStore } from "./store/productStore";
import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/product/ProductSkeleton";

export default function Home() {
  const {
    isLoading,
    error,
    fetchProducts,
    products
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetchProducts = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (error) {
    <div>
      <p>{error}</p>
      <button onClick={refetchProducts}>Try Again</button>
    </div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4">
        Filter
      </div>
      <div className="col-span-3 p-4">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {
            isLoading ?
              Array(12).fill(0).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
              : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>
      </div>
    </div>
  );
}
