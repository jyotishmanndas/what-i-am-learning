"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import axios from "axios";
import toast from 'react-hot-toast'
import { updatePasswordSchema } from '@/validations/authValidation'
import { useUpdatePassword } from '@/hooks/useAuthApi'
import { useRouter } from 'next/navigation'

export type updatePassword = z.infer<typeof updatePasswordSchema>

export interface updatePass {
    data: updatePassword,
    token: string | null
}

const ResetPasswordForm = ({ token }: { token: string | null }) => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const form = useForm<updatePassword>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
    });

    const { mutate: updatePassword, error, isPending } = useUpdatePassword();

    async function onSubmit(data: updatePassword) {
        updatePassword({ data, token }, {
            onSuccess: (res) => {
                toast.success(res.msg);
                router.push("/login")
                form.reset();
            },
            onError: (err) => {
                if (axios.isAxiosError(err)) {
                    toast.error(err.response?.data.msg)
                }
            }
        })
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

            <button disabled={isPending} className="group w-full px-3 py-3 bg-black text-white mt-5 rounded-lg flex items-center justify-center gap-3">
                Reset password
                <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    )
}

export default ResetPasswordForm