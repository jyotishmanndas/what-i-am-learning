import React from 'react'
import { Link, useNavigate } from 'react-router'

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className='w-full px-14 py-4 border shadow-sm flex items-center justify-between font-mono fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-2xl'>
            <Link to="/" className='text-3xl font-extrabold'>
                FLIPKART
            </Link>

            <div className='flex items-center gap-4'>
                <button onClick={() => navigate("/login")} className='px-3 py-2 border'>Log in</button>
                <button onClick={() => navigate("/signup")} className='px-3 py-2 border'>Sign up</button>
            </div>
        </div>
    )
}

export default Navbar