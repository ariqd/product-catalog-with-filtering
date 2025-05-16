import { Star } from 'lucide-react'
import React, { memo } from 'react'
import { useProductStore } from '@/app/store/productStore'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const RatingFilter: React.FC = () => {
    const setMinRating = useProductStore((s) => s.setMinRating);

    return (
        <div className='category-container'>
            <div className="category-header">
                <div className='category-title'>Rating</div>
            </div>
            <RadioGroup>
                {
                    [5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                            <RadioGroupItem value={rating.toString()} id={`filter-rating-${rating}`} onClick={() => setMinRating(rating)} />
                            <label htmlFor={`filter-rating-${rating}`}>
                                <div className='flex items-center'>
                                    <Star size={15} className="fill-yellow-500 stroke-yellow-500 mr-1" />
                                    {rating} Star{rating > 1 ? 's' : ''} {rating < 5 && '& above'}
                                </div>
                            </label>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default memo(RatingFilter)