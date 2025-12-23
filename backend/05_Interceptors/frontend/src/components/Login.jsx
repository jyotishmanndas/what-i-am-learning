import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post("/api/v1/user/signin", data);
            if (response.status === 200) {
                toast.success(response.data.msg);
                dispatch(setUser(response.data.user))
                navigate("/dashboard");
                reset()
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response.data.msg);
                reset()
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className=" p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Login to your account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            hover:bg-blue-700 transition font-semibold cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <span onClick={() => navigate("/register")} className="text-blue-600 hover:underline cursor-pointer">
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login