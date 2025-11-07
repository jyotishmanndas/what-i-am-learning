import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Product = () => {
    return (
        <div className='h-[90%] flex items-center justify-center text-2xl'>
            <div className='absolute top-28 text-[19px] flex items-center gap-10'>
                <Link className='hover:text-neutral-500 transition-colors duration-200' to="/product/men">Men</Link>
                <Link className='hover:text-neutral-500 transition-colors duration-200' to="/product/women">Women</Link>
            </div>

            <Outlet />
        </div>
    )
}

export default Product