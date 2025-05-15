import React, { memo, useCallback, useEffect } from 'react'
import ProductSkeleton from './ProductSkeleton'
import { Product } from '@/app/types/product'
import ProductCard from './ProductCard'
import { useProductStore } from '@/app/store/productStore'

const ProductGrid: React.FC = () => {
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

    if (isLoading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {Array(12).fill(0).map((_, index) => (
                    <ProductSkeleton key={index} />
                ))}
            </div>
        )
    }

    if (error) {
        <div>
            <p>{error}</p>
            <button onClick={refetchProducts}>Try Again</button>
        </div>
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
            {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default memo(ProductGrid)