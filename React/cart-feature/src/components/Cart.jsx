import React from 'react'
import ProductCard from './ProductCard'

const Cart = ({ cartItems }) => {
    return (
        <div className='h-screen w-full bg-white absolute top-24 p-8'>
            <div className=' flex items-center gap-5 flex-wrap'>
                {cartItems.length === 0 ? (
                    <div className='h-full w-full flex items-center justify-center'>
                        <h1 className=' text-2xl font-medium'>No items in cart</h1>
                    </div>
                ) : (
                    <>
                        {
                            cartItems.map((items) => (
                                <ProductCard key={items.id} items={items} />
                            ))
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default Cart