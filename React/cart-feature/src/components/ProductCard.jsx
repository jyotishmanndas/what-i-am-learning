import React from 'react'

const ProductCard = ({ items, setCartItems }) => {

    const handleAddToCart  = ()=>{
        setCartItems((prev) => [...prev, items])
    }
    return (
        <div className='h-80 w-72 bg-gray-200 m-2 rounded-md p-3 shadow-lg '>
            <div className='h-40 w-full rounded-lg overflow-hidden' >
                <img className='h-full w-full object-cover rounded-lg' src={items.img} />
            </div>

            <div className='mt-5'>
                <h1 className='text-2xl font-medium'>{items.name}</h1>
                <h2 className='font-medium text-xl'>{items.price}</h2>
            </div>

            <div className='flex items-center justify-between mt-4'>
                <button onClick={handleAddToCart } className='px-3 py-2 bg-indigo-600 rounded-md cursor-pointer'>Add to cart</button>
                <button className='px-3 py-2 bg-green-500 rounded-md cursor-pointer'>Buy now</button>
            </div>
        </div>
    )
}

export default ProductCard