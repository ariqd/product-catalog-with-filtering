import { Product } from '@/app/types/product'
import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import useEmblaCarousel from 'embla-carousel-react';
import { currencyFormatter } from '@/app/utils/transform';
import { Button } from '../ui/button';
import { useCartStore } from '@/app/store/productStore';

const ProductDialog = ({ product }: { product: Product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const [status, setStatus] = useState("idle");

    const handleAddToCart = useCallback((product: Product) => {
        setStatus("loading");
        setTimeout(() => {
            addToCart(product);
            setStatus('added');
            setTimeout(() => setStatus('idle'), 1500);
        }, 600);
    }, [addToCart]);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='pr-10'>
                    <p className="text-gray-900 text-2xl mb-2 overflow-hidden">{product.title}</p>
                </DialogTitle>
            </DialogHeader>
            <div>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {
                            product.images.map((image, index) => (
                                <div className="min-w-full relative aspect-[16/9]" key={index} >
                                    <Image
                                        src={image}
                                        alt={product.title}
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                        className="object-contain"
                                        fill
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <button
                        onClick={scrollPrev}
                        className="absolute left-2 top-1/3 -translate-y-1/2 text-black px-3 py-2 rounded-full z-10 hover:cursor-pointer"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-2 top-1/3 -translate-y-1/2 text-black px-3 py-2 rounded-full z-10 hover:cursor-pointer"
                    >
                        <ChevronRight />
                    </button>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='my-4 text-gray-600'>
                        <span className='capitalize'>{product.category.replace(/-/g, " ")}</span> {product.brand && `by ${product.brand}`}
                    </div>
                    <div className='flex gap-1 items-center'>
                        <Star size={20} className="fill-yellow-500 stroke-yellow-500" />
                        <div className='text-lg text-gray-500'>{product.rating.toFixed(1)}</div>
                    </div>
                </div>

                <div className='text-sm mb-2 text-gray-600'>
                    Current stock: {product.stock} items
                </div>

                <p className='my-4'>{product.description}</p>

                <div className="flex items-end justify-between mt-12">
                    <div className='text-3xl'>
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
                    </div>
                    <div>
                        {
                            product.stock > 0 ?
                                <Button onClick={() => handleAddToCart(product)}>
                                    <ShoppingCart />
                                    {status === "loading" && (
                                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></span>
                                    )}
                                    {status === "added" ? "Added!" : status === "loading" ? "Adding..." : "Add to Cart"}

                                </Button>
                                :
                                <span className='text-sm mb-2 text-gray-700'>{product.availabilityStatus}</span>
                        }
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default ProductDialog