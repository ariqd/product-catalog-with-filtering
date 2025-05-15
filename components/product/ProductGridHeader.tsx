import React, { memo } from 'react'
import SortingDropdown from '../sorting/SortingDropdown'
import { useCategoryStore } from '@/app/store/productStore';

const ProductGridHeader: React.FC = () => {
    const { selectedCategories } = useCategoryStore();

    return (
        <div className='flex justify-between items-center mb-4'>
            {
                selectedCategories.length > 0 ? (
                    <div className='text-xl font-bold'>
                        Showing {selectedCategories.map((category, index) => (
                            <span key={category.slug}>
                                {category.name}
                                {index < selectedCategories.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </div>
                ) :
                    <div className='text-xl font-bold'>All Products</div>
            }
            <div className="flex items-center">
                <span className='text-sm mr-2'>Sort by:</span>
                <SortingDropdown />
            </div>
        </div>
    )
}

export default memo(ProductGridHeader)