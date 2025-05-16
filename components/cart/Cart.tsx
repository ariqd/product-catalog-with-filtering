import Image from 'next/image';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { useCartStore } from '@/app/store/productStore';
import { Button } from '../ui/button';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { currencyFormatter } from '@/app/utils/transform';

const Cart = () => {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCartStore();

    const total = useCartStore((state) => state.getTotalPrice());

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    <p className="text-gray-900 text-2xl mb-2">Shopping Cart</p>
                </DialogTitle>
            </DialogHeader>
            {
                cart.length > 0 ?
                    <div className="h-130 overflow-y-auto">
                        {cart.map((cartItem) => (
                            <div key={cartItem.id} className="flex items-center justify-between border-b border-gray-100 py-4">
                                <div className="flex items-center gap-2 w-full">
                                    <Image
                                        src={cartItem.thumbnail}
                                        alt={cartItem.title}
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                        height={100}
                                        width={100}
                                    />
                                    <div className="flex flex-col w-full">
                                        <div className="overflow-hidden truncate">{cartItem.title}</div>
                                        <div className="overflow-hidden truncate">
                                            {
                                                cartItem.discountPercentage ? (
                                                    <div>
                                                        <span className='mr-1 text-sm'>Total:</span>
                                                        <span className="text-sm font-bold text-gray-900">
                                                            {currencyFormatter(
                                                                (cartItem.price - (cartItem.price * (cartItem.discountPercentage / 100))) * cartItem.quantity
                                                            )}
                                                        </span>
                                                        <span className="ml-2 text-xs text-gray-400 line-through">{currencyFormatter(cartItem.price * cartItem.quantity)}</span>
                                                    </div>
                                                ) : <span className="font-bold text-gray-900">${currencyFormatter(cartItem.price * cartItem.quantity)}</span>
                                            }
                                        </div>

                                        <div className="flex items-center justify-between w-full mt-2 px-2 py-1 rounded">
                                            <div className="flex items-center gap-4">
                                                <Button
                                                    onClick={() => decreaseQuantity(cartItem.id)}
                                                    variant={'outline'}
                                                    size={'sm'}
                                                >
                                                    <Minus className="text-black" />
                                                </Button>
                                                <span>{cartItem.quantity}</span>
                                                <Button
                                                    onClick={() => increaseQuantity(cartItem.id)}
                                                    variant={'outline'}
                                                    size={'sm'}
                                                >
                                                    <Plus className="text-black" />
                                                </Button>
                                            </div>

                                            <Button
                                                onClick={() => removeFromCart(cartItem.id)}
                                                variant={'secondary'}
                                                size={'sm'}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className='flex items-center justify-center h-48 text-gray-600'>
                        Cart is empty
                    </div>
            }

            <p className="text-lg font-semibold">
                Total after discounts:{' '}
                <span className="text-green-600">${total.toFixed(2)}</span>
            </p>

            <Button>Checkout <ArrowRight /></Button>
        </DialogContent>
    )
}

export default Cart