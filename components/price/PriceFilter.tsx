import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Slider } from '../ui/slider'
import { cn } from '@/lib/utils'
import { useProductStore } from '@/app/store/productStore'
import { currencyFormatter } from '@/app/utils/transform'
import { Skeleton } from '../ui/skeleton'

const PriceFilter: React.FC = () => {
    const { products, priceRange, setPriceRange, isLoading } = useProductStore();

    const prices = useMemo(() => products.map(product => product.price), [products]);
    const highestPrice = useMemo(() => Math.max(...prices), [prices]);

    useEffect(() => {
        setPriceRange([0, highestPrice]);
    }, [highestPrice, setPriceRange]);

    const setRangeValue = useCallback((num1: number, num2: number) => {
        setPriceRange([num1, num2]);
    }, [setPriceRange])

    return (
        <div className='category-container'>
            <div className="category-header">
                <div className='category-title'>Price Range</div>
            </div>
            {
                isLoading ? (
                    <Skeleton className='h-4 w-50 rounded bg-gray-300 mb-2' />
                ) : (
                    <>
                        <div className='flex items-center gap-1 mb-3'>
                            <span>From</span>
                            <span>{currencyFormatter(priceRange[0])}</span>
                            <span>to</span>
                            <span>{currencyFormatter(priceRange[1])}</span>
                        </div>
                        <Slider
                            min={0}
                            max={highestPrice}
                            value={priceRange}
                            className={cn('w-[100%]')}
                            onValueChange={(val) => setRangeValue(val[0], val[1])}
                            step={1}
                        />
                    </>
                )
            }
        </div>
    )
}

export default memo(PriceFilter)