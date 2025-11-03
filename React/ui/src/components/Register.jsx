import React from 'react'

const Register = ({setIsLogin}) => {
  return (
    <div className='w-[450px] rounded-2xl bg-white p-8 flex items-center justify-center flex-col'>
      <h1 className='text-3xl font-bold leading-12'>Create Account</h1>
      <p className='text-gray-500'>Sign up to get started</p>

      <form action="" className='flex flex-col w-full space-y-5'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="text" className='font-medium'>Name</label>
          <input type="text" placeholder='Enter your name' className='w-full p-3 rounded-md border border-gray-300' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className='font-medium'>Email</label>
          <input type="text" placeholder='Enter your email' className='w-full p-3 rounded-md border border-gray-300' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" className='font-medium'>Password</label>
          <input type="password" placeholder='Create a password' className='w-full p-3 rounded-md border border-gray-300' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" className='font-medium'>Confirm Password</label>
          <input type="password" placeholder='Confirm your password' className='w-full p-3 rounded-md border border-gray-300' />
        </div>

        <button type='submit' className='w-full p-3 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-800 transition-colors duration-300'>Sign In</button>

        <p className='text-center'>Already have an account? <span onClick={()=>setIsLogin(prev => !prev)} className='font-medium text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors duration-200'>Sign In</span></p>
      </form>
    </div>
  )
}

export default Register