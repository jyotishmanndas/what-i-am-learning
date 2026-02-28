import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import axios from "axios";
import { useNavigate } from 'react-router'
import { axiosInstance } from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { updatePasswordSchema } from '../../validations/user.validation'

const ResetPasswordForm = ({ token }: { token: string | null }) => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof updatePasswordSchema>>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
    });

    async function onSubmit(data: z.infer<typeof updatePasswordSchema>) {
        try {
            if (!token) {
                toast.error("Invalid or expired reset link");
                return;
            }
            const res = await axiosInstance.patch("/api/v1/user/reset-password", { data, token });
            if (res.status === 200) {
                toast.success(res.data.msg);
                form.reset()
                navigate("/login");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.msg, { position: "bottom-center" });
                form.reset()
            }
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-6'>
                <Controller
                    name="newPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="relative">
                            <label htmlFor="password" className="block mb-1 text-sm font-medium">
                                New Password
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>

                                <input
                                    {...field}
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-2 border-b-3 rounded focus:outline-none duration-200"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(prev => !prev)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showNewPassword ? (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>

                            {fieldState.error && (
                                <p className="text-red-500 text-xs mt-1">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="relative">
                            <label htmlFor="password" className="block mb-1 text-sm font-medium">
                                Confirm Password
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>

                                <input
                                    {...field}
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-2 border-b-3 rounded focus:outline-none duration-200"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>

                            {fieldState.error && (
                                <p className="text-red-500 text-xs mt-1">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </div>
                    )}
                />
            </div>

            <button className="group w-full px-3 py-3 bg-black text-white mt-5 rounded-lg flex items-center justify-center gap-3">
                Update
                <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    )
}

export default ResetPasswordForm