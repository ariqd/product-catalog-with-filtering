'use client'

import ProductGrid from "@/components/product/ProductGrid";
import ProductFilter from "@/components/product/ProductFilter";
import ProductGridHeader from "@/components/product/ProductGridHeader";

export default function Home() {
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
