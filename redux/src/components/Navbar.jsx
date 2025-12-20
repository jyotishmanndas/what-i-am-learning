import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
    return (
        <div className='w-full py-6 px-14 flex items-center justify-between shadow-sm'>
            <div className='text-xl font-semibold'>
                Logo
            </div>
            <div className='flex items-center gap-10'>
                <NavLink to="/products" className="text-lg font-semibold">Products</NavLink>
                <NavLink to="/users" className="text-lg font-semibold">Users</NavLink>
            </div>
            <div className='flex items-center gap-10'>
                <NavLink to="/cart" className='text-lg font-semibold'>Cart</NavLink>
                <span className='text-lg font-semibold'>Profile</span>
            </div>
        </div>
    )
}

export default Navbar