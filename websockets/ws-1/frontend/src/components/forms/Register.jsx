import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../../config/axiosInstance';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post("/api/v1/user/signup", data);
            if (response.status === 200) {
                // navigate("/dashboard")
                reset();
            }
        } catch (error) {
            // toast.error("Something went wrong");
            reset()
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Enter your details
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-gray-600 mb-1">Username</label>
                        <input
                            {...register("username", { required: true })}
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
                    <span onClick={() => navigate("/login")} className="text-blue-600 hover:underline cursor-pointer">
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register
