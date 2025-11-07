import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate();
    return (
        <div className='flex items-center justify-center h-[90%] w-full'>
            <div className='w-[450px] rounded-2xl bg-white p-8 flex items-center justify-center flex-col'>
                <h1 className='text-3xl font-bold leading-12'>Welcome back</h1>
                <p className='text-gray-500'>Signin to your account</p>

                <form action="" className='flex flex-col w-full space-y-5'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input type="text" placeholder='Enter your email' className='w-full p-3 rounded-md border border-gray-300' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password" className='font-medium'>Password</label>
                        <input type="password" placeholder='Enter your password' className='w-full p-3 rounded-md border border-gray-300' />
                    </div>

                    <button type='submit' className='w-full p-3 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-800 transition-colors duration-300'>Sign In</button>

                    <p className='text-center'>Don't have an account? <span onClick={() => navigate("/signup")} className='font-medium text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors duration-200'>Sign Up</span></p>
                </form>
            </div>
        </div>
    )
}

export default SignIn