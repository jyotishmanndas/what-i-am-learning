import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import axios from "axios";
import { Link, useNavigate } from 'react-router'
import { axiosInstance } from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { resetPsswordSchema } from '../../validations/user.validation'

const ForgotPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof resetPsswordSchema>>({
        resolver: zodResolver(resetPsswordSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: z.infer<typeof resetPsswordSchema>) {
        try {
            const res = await axiosInstance.post("/api/v1/user/forgot-password", data);
            if (res.status === 200) {
                toast.success(res.data.msg);
                form.reset()
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.msg);
                form.reset()
            }
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-6'>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="relative">
                            <label htmlFor="email" className="block mb-1 text-sm font-medium">
                                Email Address
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>

                                <input
                                    {...field}
                                    id="email"
                                    type="email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-3 py-2 border-b-3 rounded focus:outline-none duration-200"
                                />
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

            <button className="group w-full px-3 py-3 bg-black text-white mt-8 rounded-lg flex items-center justify-center gap-3">
                Submit
                <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    )
}

export default ForgotPasswordForm