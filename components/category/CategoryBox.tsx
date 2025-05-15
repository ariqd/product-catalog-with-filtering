import { Category } from '@/app/types/product'
import React, { memo, useCallback } from 'react'
import { Checkbox } from '../ui/checkbox'
import { useCategoryStore } from '@/app/store/productStore'

interface CategoryBoxProps {
    category: Category
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ category }) => {
    const { slug, name } = category;

    const { toggleSelectedCategory, selectedCategories } = useCategoryStore();

    const toggleCategory = useCallback((category: Category) => {
        toggleSelectedCategory(category);
    }, [toggleSelectedCategory]);

    const isChecked = selectedCategories.some((selectedCategory) => selectedCategory.slug === slug);
    const isDisabled = selectedCategories.length === 3 && !isChecked;

    return (
        <div className="flex items-center space-x-2 mb-4">
            <Checkbox
                checked={selectedCategories.some((selectedCategory) => selectedCategory.slug === category.slug)}
                id={`category-${slug}`}
                onCheckedChange={() => toggleCategory(category)} disabled={isDisabled} />
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