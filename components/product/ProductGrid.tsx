'use client'

import React, { memo, useCallback } from 'react'
import ProductSkeleton from './ProductSkeleton'
import { Product } from '@/app/types/product'
import ProductCard from './ProductCard'
import { useProductStore } from '@/app/store/productStore'

interface ProductGridProps {
    refetch: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ refetch }) => {
    const { filteredProducts, isLoading, error } = useProductStore();

    const refetchProducts = useCallback(() => {
        refetch();
    }, [refetch]);

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
            {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default memo(ProductGrid)