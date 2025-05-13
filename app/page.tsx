'use client'

import { useEffect } from "react";
import { useProductStore } from "./store/productStore";

export default function Home() {
  const {
    isLoading,
    error,
    fetchProducts,
    products
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    <div>
      <p>{error}</p>
      <button onClick={() => fetchProducts()}>Try Again</button>
    </div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Product Catalog</h1>
      <div>
        Filter
      </div>
      <div>
        Products

        {
          products.map((product) => (
            <div key={product.id}>
              <p>{product.title}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
