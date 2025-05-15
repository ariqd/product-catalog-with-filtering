import React, { memo, useCallback, useEffect, useState } from 'react'
import ProductSkeleton from './ProductSkeleton'
import { Product } from '@/app/types/product'
import ProductCard from './ProductCard'
import { useCategoryStore, useProductStore } from '@/app/store/productStore'

const ProductGrid: React.FC = () => {
    const {
        isLoading,
        error,
        fetchProducts,
        products
    } = useProductStore();

    const { selectedCategories } = useCategoryStore();

    const [filtered, setFiltered] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        // FIlter products based on selected categories
        const filteredProducts = products.filter((product: Product) => {
            if (selectedCategories.length === 0) return true;
            return selectedCategories.some((category) => product.category.includes(category.slug));
        });

        setFiltered(filteredProducts);
    }, [products, selectedCategories]);

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
            {filtered.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default memo(ProductGrid)