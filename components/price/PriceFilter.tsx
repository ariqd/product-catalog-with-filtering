import React, { memo, useMemo } from 'react'
import { Slider } from '../ui/slider'
import { cn } from '@/lib/utils'
import { useProductStore } from '@/app/store/productStore'
import { currencyFormatter } from '@/app/utils/transform'

const PriceFilter: React.FC = () => {
    const { products } = useProductStore();

    const prices = useMemo(() => products.map(product => product.price), [products]);
    const highestPrice = useMemo(() => Math.max(...prices), [prices]);
    const lowestPrice = useMemo(() => Math.min(...prices), [prices]);

    return (
        <div className='category-container'>
            <div className="category-header">
                <div className='category-title'>Price Range</div>
            </div>
            <div className='flex justify-between items-center mb-3'>
                <span>{currencyFormatter(lowestPrice)}</span>
                <span>{currencyFormatter(highestPrice)}</span>
            </div>
            <Slider defaultValue={[0, 100]} className={cn('w-[100%]')} />
        </div>
    )
}

export default memo(PriceFilter)