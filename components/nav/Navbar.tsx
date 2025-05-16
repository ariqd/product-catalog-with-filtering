'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogTrigger } from '../ui/dialog';
import { useCartStore } from '@/app/store/productStore';
import Cart from '../cart/Cart';

const Navbar = () => {
    const cartLength = useCartStore((state) => state.cart.length);

    return (
        <header className="py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-3xl font-bold">Product Catalog</Link>
                <Dialog>
                    <DialogTrigger className='cursor-pointer'>
                        <div className='flex gap-2'><ShoppingCart /> Shopping Cart ({cartLength})</div>
                    </DialogTrigger>
                    <Cart />
                </Dialog>
            </div>
        </header>
    )
}

export default Navbar