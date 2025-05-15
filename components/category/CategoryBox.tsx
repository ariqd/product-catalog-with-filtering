import { Category } from '@/app/types/product'
import React, { memo } from 'react'
import { Checkbox } from '../ui/checkbox'

interface CategoryBoxProps {
    category: Category
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ category }) => {
    const { slug, name } = category;

    return (
        <div className="flex items-center space-x-2 mb-4" key={slug}>
            <Checkbox id={slug} />
            <label
                htmlFor={slug}
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {name}
            </label>
        </div>
    )
}

export default memo(CategoryBox)