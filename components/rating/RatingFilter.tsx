import { Star } from 'lucide-react'
import React, { memo } from 'react'
import { Checkbox } from '../ui/checkbox'

const RatingFilter: React.FC = () => {
    return (
        <div className='category-container'>
            <div className='category-title'>Rating</div>
            {
                // descending order of rating, 5 to 1, with 4,2,3,1 have "and above" text
                [5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className='flex items-center mb-3 gap-2'>
                        <Checkbox id={`filter-rating-${rating}`} />
                        <label
                            htmlFor={`filter-rating-${rating}`}
                            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            <div className='flex items-center'>
                                <Star size={15} className="fill-yellow-500 stroke-yellow-500 mr-1" />
                                {rating} Star{rating > 1 ? 's' : ''} {rating < 5 && '& above'}
                            </div>
                        </label>
                    </div>
                ))
            }
        </div>
    )
}

export default memo(RatingFilter)