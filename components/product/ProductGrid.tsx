'use client'

import React, { memo, useCallback } from 'react'
import ProductSkeleton from './ProductSkeleton'
import { Product } from '@/app/types/product'
import ProductCard from './ProductCard'
import { useProductStore } from '@/app/store/productStore'
import { sortProducts } from '@/app/utils/transform'

interface ProductGridProps {
    refetch: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ refetch }) => {
    const { filteredProducts, isLoading, error, sortKey, sortOrder } = useProductStore();

    const refetchProducts = useCallback(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
                {Array(15).fill(0).map((_, index) => (
                    <ProductSkeleton key={index} />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={refetchProducts}>Try Again</button>
            </div>
        )
    }

    if (filteredProducts.length <= 0) {
        return (
            <div className='flex items-center justify-center mt-20'>
                <div className='text-gray-500 text-sm'>No products found. Please change your product filters and try again.</div>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
            {sortProducts(filteredProducts, sortKey, sortOrder).map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default memo(ProductGrid)