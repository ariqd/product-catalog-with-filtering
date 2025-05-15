import { Category } from '@/app/types/product'
import React, { memo, useCallback } from 'react'
import { Checkbox } from '../ui/checkbox'
import { useCategoryStore } from '@/app/store/productStore'

interface CategoryBoxProps {
    category: Category
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ category }) => {
    const { slug, name } = category;

    const { toggleSelectedCategory } = useCategoryStore();

    const toggleCategory = useCallback((category: Category) => {
        toggleSelectedCategory(category);
    }, [toggleSelectedCategory]);

    return (
        <div className="flex items-center space-x-2 mb-4">
            <Checkbox id={`category-${slug}`} onClick={() => toggleCategory(category)} />
            <label
                htmlFor={`category-${slug}`}
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {name}
            </label>
        </div>
    )
}

export default memo(CategoryBox)