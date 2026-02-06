import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { registerSchema } from '@/lib/zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react'
import axios from "axios";
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { axiosInstance } from '@/config/axiosInstance'
import { useAppDispatch } from '@/hooks/useRedux'
import { setUser } from '@/features/authSlice'

const SIgnupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
            password: ""
        },
    });

    async function onSubmit(data: z.infer<typeof registerSchema>) {
        try {
            const res = await axiosInstance.post("/api/v1/auth/register", data);
            if (res.status === 201) {
                toast.success(res.data.msg, { position: "bottom-center" });
                dispatch(setUser(res.data.data))
                form.reset()
                navigate("/home");
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
            <FieldGroup>
                <Controller
                    name='name'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>
                                Full Name
                            </FieldLabel>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <User className='h-5 w-5 text-gray-400' />
                                </div>
                                <input {...field} aria-invalid={fieldState.invalid} type='text'
                                    className='w-full pl-10 pr-3 py-2 border-b-3 rounded focus:outline-none duration-200'
                                    placeholder='Enter your name'
                                />
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name='email'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>
                                Email Address
                            </FieldLabel>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='h-5 w-5 text-gray-400' />
                                </div>
                                <input {...field} aria-invalid={fieldState.invalid} type='email'
                                    className='w-full pl-10 pr-3 py-2 border-b-3 rounded focus:outline-none duration-200'
                                    placeholder='Enter your email'
                                />
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name='mobile'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>
                                Mobile No.
                            </FieldLabel>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Phone className='h-5 w-5 text-gray-400' />
                                </div>
                                <input {...field} aria-invalid={fieldState.invalid} type='text'
                                    className='w-full pl-10 pr-3 py-2 border-b-3 rounded focus:outline-none duration-200'
                                    placeholder='Enter your mobile no.'
                                />
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name='password'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>
                                Password
                            </FieldLabel>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400' />
                                </div>
                                <input {...field} aria-invalid={fieldState.invalid} type={showPassword ? "text" : "password"}
                                    className='w-full pl-10 pr-3 py-2 border-b-3 rounded focus:outline-none duration-200'
                                    placeholder='Enter your password'
                                />
                                <button type='button' onClick={() => setShowPassword((prev) => !prev)} className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                                    {showPassword ? (
                                        <Eye className='h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors' />
                                    ) : (
                                        <EyeOff className='h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors' />
                                    )}
                                </button>
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <button className='group w-full px-3 py-3 bg-black text-white mt-5 rounded-lg flex items-center justify-center gap-3'>
                Sign up
                <ArrowRight className='h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition-transform' />
            </button>

            <p className='text-center mt-3 text-sm'>Already have an account? <Link to="/login" className='text-[#009698] hover:underline transition'>Sign in here</Link></p>
        </form>
    )
}

export default SIgnupForm