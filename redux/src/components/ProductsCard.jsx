import React from 'react'
import { ShoppingCart, Zap } from "lucide-react"
import { useLocation } from 'react-router'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../features/cartSlice';

const ProductsCard = ({ product }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    return (
        <div className='group relative w-full rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02] h-full flex flex-col'>
            <div className="cursor-pointer relative overflow-hidden bg-white shrink-0">
                <div className="h-64 w-full flex items-center justify-center p-6">
                    <img
                        loading='lazy'
                        className="object-contain h-full w-full rounded-lg transition-transform duration-300 group-hover:scale-110"
                        src={product.image}
                        alt={product.title}
                    />
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="cursor-pointer mb-4 flex-1">
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 leading-tight group-hover:text-gray-500 transition-colors">
                        {product.title}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-600">${product.price}</span>
                        {product.rating && (
                            <span className="text-sm text-gray-300">⭐ {product.rating?.rate || 'N/A'}</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                    <button
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <Zap size={18} />
                        Buy now
                    </button>

                    {pathname !== "/cart" ? (
                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className={`px-4 py-2.5 rounded-xl font-semibold transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer`}
                        >
                            <ShoppingCart size={18} />
                            Add
                        </button>
                    ) : (
                        <button onClick={() => dispatch(removeFromCart(product.id))} className='px-4 py-2.5 rounded-xl text-white font-semibold bg-red-500 hover:bg-red-400 cursor-pointer transition-colors duration-200 shadow-md '>
                            Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductsCard