import React, { useState } from 'react'

const Register = ({ setToogle, setUsersData, usersData }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsersData((prev) => [...prev, formData])
        localStorage.setItem("data", JSON.stringify([...usersData, formData]))
        setFormData({
            name: "",
            email: "",
            password: ""
        })
    }

    return (
        <div className='w-[450px] rounded-2xl bg-white p-8 flex items-center justify-center flex-col border border-gray-300 shadow-md'>
            <h1 className='text-3xl font-semibold leading-12'>Create Account</h1>
            <p className='text-gray-500'>Sign up to get started</p>

            <form onSubmit={handleSubmit} className='flex flex-col w-full space-y-5'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='font-medium'>Name</label>
                    <input onChange={handleChange} name='name' value={formData.name} type="text" placeholder='Enter your name' className='w-full p-3 rounded-md border border-gray-300' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='font-medium'>Email</label>
                    <input onChange={handleChange} name='email' value={formData.email} type="text" placeholder='Enter your email' className='w-full p-3 rounded-md border border-gray-300' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password" className='font-medium'>Password</label>
                    <input onChange={handleChange} name='password' value={formData.password} type="password" placeholder='Enter your password' className='w-full p-3 rounded-md border border-gray-300' />
                </div>

                <button type='submit' className='w-full p-3 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-800 transition-colors duration-300'>Register</button>

                <p className='text-center'>Already have an account? <span onClick={() => setToogle(prev => !prev)} className='font-medium text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors duration-200'>Login</span></p>
            </form>
        </div>
    )
}

export default Register