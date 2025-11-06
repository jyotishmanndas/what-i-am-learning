import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className='py-6 px-12 flex items-center justify-between'>
            <h2 className='text-2xl font-semibold'>Sheryians</h2>

            <div className='flex items-center gap-20 font-medium text-lg'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact us</Link>
            </div>
        </div>
    )
}

export default Navbar
