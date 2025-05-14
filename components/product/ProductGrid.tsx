import React, { useCallback } from 'react'
import ProductSkeleton from './ProductSkeleton'
import { Product, ProductState } from '@/app/types/product'
import ProductCard from './ProductCard'

const ProductGrid: React.FC<ProductState> = ({ products, isLoading, error, fetchProducts }) => {
    const refetchProducts = useCallback(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (isLoading) {
        return Array(12).fill(0).map((_, index) => (
            <ProductSkeleton key={index} />
        ))
    }

    if (error) {
        <div>
            <p>{error}</p>
            <button onClick={refetchProducts}>Try Again</button>
        </div>
    }

    return products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
    ))
}

export default ProductGrid