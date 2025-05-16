import { memo } from "react"
import CategoryFilter from "../category/CategoryFilter"
import PriceFilter from "../price/PriceFilter"
import RatingFilter from "../rating/RatingFilter"

const ProductFilter = () => {
    return (
        <div>
            <div className='text-xl font-bold mb-6'>
                Filter
            </div>
            <CategoryFilter />
            <PriceFilter />
            <RatingFilter />
        </div>
    )
}

export default memo(ProductFilter)