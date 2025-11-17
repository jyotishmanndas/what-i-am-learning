import React from 'react'

const Navbar = ({setIsCartOpen}) => {
    return (
        <div className='w-full px-6 py-6 flex items-center justify-between shadow-md'>
            <h1 className='text-3xl font-semibold'>Navbar</h1>

            <div className='flex items-center gap-7 text-xl cursor-pointer'>

                <button onClick={()=> setIsCartOpen(prev => !prev)} className='px-4 py-2 bg-black text-white cursor-pointer rounded-lg'>Cart</button>
                <button className='px-4 py-2 bg-black text-white cursor-pointer rounded-lg'>Profile</button>
            </div>
        </div>
    )
}

export default Navbar