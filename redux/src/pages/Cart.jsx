import { ShoppingBag, ShoppingCart } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductsCard from '../components/ProductsCard'
import { useNavigate } from 'react-router'

const Cart = () => {
    const navigate = useNavigate();
    const { cart } = useSelector(state => state.cart);

    const totalPrice = cart.reduce((acc, total) => {
        return acc + total.price
    }, 0)
    return (
        <div className='p-8 w-full min-h-ful'>
            <div className='max-w-7xl mx-auto'>

                <div className='mb-8'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3'>
                        <ShoppingCart className='text-blue-600' size={40} />
                        Shopping Cart
                    </h1>
                    <p className='text-gray-600'>
                        {cart.length > 0
                            ? `${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`
                            : 'Your cart is empty'
                        }
                    </p>
                </div>

                {cart.length > 0 ? (
                    <div className='flex flex-col lg:flex-row gap-8'>
                        <div className='flex-1'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {cart.map((product) => (
                                    <ProductsCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>

                        <div className='lg:w-80'>
                            <div className='bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sticky top-8'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Order Summary</h2>

                                <div className='space-y-4 mb-6'>
                                    <div className='flex justify-between text-gray-700'>
                                        <span>Subtotal ({cart.length} items)</span>
                                        <span className='font-semibold'>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-700'>
                                        <span>Shipping</span>
                                        <span className='font-semibold text-green-600'>Free</span>
                                    </div>
                                    <div className='border-t border-gray-200 pt-4'>
                                        <div className='flex justify-between text-xl font-bold text-gray-900'>
                                            <span>Total</span>
                                            <span className='text-blue-600'>${totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className='w-full px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'>
                                    <ShoppingBag size={20} />
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
                        <div className='w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6'>
                            <ShoppingCart size={64} className='text-gray-400' />
                        </div>
                        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Your cart is empty</h2>
                        <p className='text-gray-600 text-lg mb-8'>Start adding products to your cart!</p>
                        <button
                            onClick={() => navigate("/products")}
                            className='px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl'
                        >
                            Browse Products
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart