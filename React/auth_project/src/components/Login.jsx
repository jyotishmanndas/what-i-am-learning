import React, { useState } from 'react'

const Login = ({ setToogle, usersData }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = usersData.find((u) => (
            u.email === formData.email
        ));

        if (!email) {
            alert("Email not exists");
            return;
        }

        const match = usersData.find((u) => {
            return u.email === formData.email && u.password === formData.password
        })

        if (match) {
            alert("Logged in")
        } else {
            alert("Invalid credentials")
        }
    }
    return (
        <div className='w-[450px] rounded-2xl bg-white p-8 flex items-center justify-center flex-col border border-gray-300 shadow-md'>
            <h1 className='text-3xl font-semibold leading-12'>Welcome back</h1>
            <p className='text-gray-500'>Signin to your account</p>

            <form onSubmit={handleSubmit} className='flex flex-col w-full space-y-5'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='font-medium'>Email</label>
                    <input onChange={handleChange} name='email' value={formData.email} type="text" placeholder='Enter your email' className='w-full p-3 rounded-md border border-gray-300' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password" className='font-medium'>Password</label>
                    <input onChange={handleChange} name='password' value={formData.password} type="password" placeholder='Enter your password' className='w-full p-3 rounded-md border border-gray-300' />
                </div>

                <button type='submit' className='w-full p-3 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-800 transition-colors duration-300'>Login</button>

                <p className='text-center'>Don't have an account? <span onClick={() => setToogle(prev => !prev)} className='font-medium text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors duration-200'>Register</span></p>
            </form>
        </div>
    )
}

export default Login