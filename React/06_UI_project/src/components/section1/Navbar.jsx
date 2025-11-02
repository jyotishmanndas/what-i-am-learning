import React from 'react'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-12 py-8'>
            <h3 className='uppercase text-sm font-semibold bg-black py-2 px-3 rounded-full text-white'>
                Target Audience
            </h3>

            <button className='bg-gray-200 px-3 py-2 rounded-full uppercase font-semibold text-sm tracking-widest'>
                digital banking platform
            </button>
        </div>
    )
}

export default Navbar
