import React, { memo } from 'react'

const ProductGridHeader = () => {
  return (
    <div className='flex justify-between items-center mb-4'>
        <div className='text-2xl font-bold'>All Products</div>
        <div>Sort By</div>
    </div>
  )
}

export default memo(ProductGridHeader)