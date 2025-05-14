import React, { memo } from 'react'
import { Skeleton } from '../ui/skeleton'

const ProductSkeleton: React.FC = () => {
    return (
        <div className='flex flex-col border rounded'>
            <Skeleton className='w-auto h-50 rounded bg-gray-400' />
            <div className='p-4'>
                <Skeleton className='w-40 h-4 rounded bg-gray-400 mb-2' />

                <div className="flex justify-between mb-2">
                    <Skeleton className='w-20 h-4 rounded bg-gray-400' />
                    <Skeleton className='w-20 h-4 rounded bg-gray-400' />
                </div>

                <Skeleton className='w-25 h-4 rounded bg-gray-400 mb-2' />
            </div>
        </div>
    )
}

export default memo(ProductSkeleton)