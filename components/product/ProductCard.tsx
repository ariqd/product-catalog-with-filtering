import { Product } from '@/app/types/product'
import React, { memo } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { currencyFormatter } from '@/app/utils/transform';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

                {
                    product.discountPercentage ? (
                        <div>
                            <span className="font-bold text-gray-900">
                                {currencyFormatter((product.price - (product.price * (product.discountPercentage / 100))))}
                            </span>
                            <span className="ml-2 text-xs text-gray-400 line-through">{currencyFormatter(product.price)}</span>
                        </div>
                    ) : <span className="font-bold text-gray-900">${currencyFormatter(product.price)}</span>
                }

                <div className="flex justify-between mt-3">
                    <div className='text-sm text-gray-500 overflow-hidden truncate'>{product.brand}</div>
                    <div className='flex gap-1 items-center'>
                        <Star size={15} className="fill-yellow-500 stroke-yellow-500" />
                        <div className='text-sm text-gray-500'>{product.rating.toFixed(1)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductCard)