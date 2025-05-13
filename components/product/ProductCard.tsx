import { Product } from '@/app/types/product'
import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className='flex flex-col border rounded'>
            <div className='relative h-64 w-auto'>
                <div className='absolute right-1'>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
                        {product.category.replace(/-/g, " ")}
                    </span>
                </div>
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    fill
                    objectFit='contain'
                />
            </div>
            <div className='p-4'>
                <p className="text-gray-900 mb-2 overflow-hidden truncate">{product.title}</p>

                <div className="flex justify-between mb-2">
                    {
                        product.discountPercentage ? (
                            <div>
                                <span className="font-bold text-gray-900">
                                    ${(product.price - (product.price / product.discountPercentage)).toFixed(2)}
                                </span>
                                <span className="ml-2 text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                            </div>
                        ) : <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    }
                    <div className='flex gap-1 items-center'>
                        <Star size={15} className="fill-yellow-500 stroke-yellow-500" />
                        <div className='text-sm text-gray-500'>{product.rating.toFixed(1)}</div>
                    </div>
                </div>
                <div className='mb-2 text-sm text-gray-500'>{product.brand}</div>
            </div>
        </div>
    )
}

export default ProductCard