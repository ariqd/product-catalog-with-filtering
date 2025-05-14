'use client'

import { useEffect } from "react";
import { useProductStore } from "./store/productStore";
import ProductGrid from "@/components/product/ProductGrid";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4">
        Filter
      </div>
      <div className="col-span-3 p-4">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          <ProductGrid
            products={products}
            isLoading={isLoading}
            error={error}
            fetchProducts={fetchProducts}
          />
        </div>
      </div>
    </div>
  );
}
