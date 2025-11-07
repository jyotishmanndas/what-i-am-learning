import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='py-5 px-12 flex items-center justify-between shadow-md'>
            <h2 className='text-2xl font-semibold'>Sheryians</h2>
            <div className='flex items-center gap-10 font-medium text-md'>
                <Link to='/'>Home</Link>
                <Link to='/product'>Product</Link>
                <Link to='/courses'>Courses</Link>
                <Link to='/signin'>SignIn</Link>
                <Link to='/signup'>SignUp</Link>
            </div>
        </div>
    )
}

export default Navbar