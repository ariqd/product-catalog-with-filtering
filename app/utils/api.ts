"use client";

const url = "https://dummyjson.com";

export const fetchProducts = async () => {
  const response = await fetch(`${url}/products?limit=100`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products;
};
