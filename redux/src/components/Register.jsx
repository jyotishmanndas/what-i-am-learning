import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setToggle } from '../features/toggleSlice';
import { useState } from 'react';

const Register = () => {
    const [regData, setRegData] = useState(() => {
        return JSON.parse(localStorage.getItem("reg-users"))
    });
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        setRegData([...regData, data]);
        localStorage.setItem("reg-users", JSON.stringify([...regData, data]))
        reset();
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Enter your details
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-gray-600 mb-1">Name</label>
                        <input
                            {...register("name", { required: true })}
                            type="name"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg 
            hover:bg-blue-700 transition font-semibold"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <span onClick={() => dispatch(setToggle(true))} className="text-blue-600 hover:underline cursor-pointer">
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register
