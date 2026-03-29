"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, PhoneCall, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { registerSchema } from '@/validations/authValidation'
import Link from 'next/link'
import { useRegister } from '@/hooks/useAuthApi'
import axios from 'axios'

export type RegisterInput = z.infer<typeof registerSchema>;

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: ""
        },
    });

    const { mutate: registerUser, error, isPending } = useRegister();

    async function onSubmit(data: RegisterInput) {
        registerUser(data, {
            onSuccess: (res) => {
                localStorage.setItem("info", JSON.stringify(res.data))
                toast.success(res.msg);
                router.push("/home")
                form.reset();
            },
            onError: (err) => {
                if(axios.isAxiosError(err)){
                    toast(err.response?.data.msg)
                }
            }
        })
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-6'>
                <div className='flex items-center gap-5'>
                    <Controller
                        name="firstName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="relative">
                                <label className="block mb-1 text-sm font-medium">
                                    First Name
                                </label>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>

                                    <input
                                        {...field}
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="John"
                                        className="w-full pl-10 pr-3 py-2 text-sm border-b-3 rounded focus:outline-none duration-200"
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

                    <Controller
                        name="lastName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div className="relative">
                                <label className="block mb-1 text-sm font-medium">
                                    Last Name
                                </label>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>

                                    <input
                                        {...field}
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Doe"
                                        className="w-full pl-10 pr-3 py-2 text-sm border-b-3 rounded focus:outline-none duration-200"
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
                                    type="email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="johndoe@example.com"
                                    className="w-full pl-10 pr-3 py-2 border-b-3 rounded focus:outline-none duration-200"
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

                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="relative">
                            <label htmlFor="phone" className="block mb-1 text-sm font-medium">
                                Phone No
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <PhoneCall className="h-5 w-5 text-gray-400" />
                                </div>

                                <input
                                    {...field}
                                    type="number"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="9858XXXXXX"
                                    className="w-full pl-10 pr-3 py-2 border-b-3 rounded focus:outline-none duration-200"
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

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="relative">
                            <label htmlFor="password" className="block mb-1 text-sm font-medium">
                                Password
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>

                                <input
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="*********"
                                    className="w-full pl-10 pr-10 py-2 border-b-3 rounded focus:outline-none duration-200"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>

                            <div className="flex justify-end mt-1">
                                <Link
                                    href="/forgotpassword"
                                    className="text-xs text-[#009698] hover:underline"
                                >
                                    Forgot password?
                                </Link>
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

            <button disabled={isPending} className="group w-full px-3 py-3 bg-black text-white mt-5 rounded-lg flex items-center justify-center gap-3">
                Sign up
                <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center mt-3 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-[#009698] hover:underline transition">
                    Sign in here
                </Link>
            </p>
        </form>
    )
}

export default SignupForm