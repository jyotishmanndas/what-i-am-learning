import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { loginSchema } from '@/lib/zod';
import { Link, useNavigate } from 'react-router';
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "sonner";
import axios from "axios";
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      const res = await axiosInstance.post("/api/v1/auth/login", data);
      if (res.status === 200) {
        toast.success(res.data.msg, { position: "bottom-center" });
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

      <button className='w-full px-3 py-3 bg-black text-white mt-5 rounded-lg flex items-center justify-center gap-3'>
        Login
        <ArrowRight className='h-5 w-5 text-neutral-400' />
      </button>

      <p className='text-center mt-3 text-sm'>Don't have an account? <Link to="/signup" className='text-[#009698] hover:underline transition'>Sign up here</Link></p>
    </form>
  )
}

export default LoginForm