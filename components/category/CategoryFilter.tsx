import React, { useCallback, useEffect } from 'react'
import { useCategoryStore } from '@/app/store/productStore';
import { Category } from '@/app/types/product';
import { Skeleton } from '../ui/skeleton';
import CategoryBox from './CategoryBox';
import { Button } from '../ui/button';

const CategoryFilter: React.FC = () => {
    const {
        isLoading,
        error,
        fetchCategories,
        categories,
        resetSelectedCategory
    } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const refetchCategories = useCallback(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (isLoading) {
        return <div className='category-container'>
            <div className='category-title'>Categories</div>
            <div className="h-64 overflow-y-auto">
                {
                    Array(20).fill(0).map((_, index) => (
                        <Skeleton key={index} className='h-4 w-50 rounded bg-gray-300 mb-2' />
                    ))
                }
            </div>
        </div>
    }

    if (error) {
        return <div className='category-container'>
            <div className='category-title'>Categories</div>
            <p>{error}</p>
            <button onClick={refetchCategories}>Try Again</button>
        </div>
    }

    return (
        <div className='category-container'>
            <div className="category-header">
                <div className='category-title'>Categories <span className='text-xs text-gray-500'>3 max.</span></div>
                <Button variant={'secondary'} size={'sm'} onClick={() => resetSelectedCategory()}>Reset</Button>
            </div>
            <div className="h-64 overflow-y-auto">
                {categories?.map((category: Category) => <CategoryBox key={category.slug} category={category} />)}
            </div>
        </div>
    )
}

export default CategoryFilter