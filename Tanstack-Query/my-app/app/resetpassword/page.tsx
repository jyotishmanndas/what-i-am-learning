"use client"

import ResetPasswordForm from '@/components/forms/ResetPasswordForm'
import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col justify-center px-6">
                <div className="w-full max-w-md mx-auto shadow-xl rounded-lg px-6 py-5 font-mono">
                    <h2 className="text-2xl font-bold text-black mb-1.5 text-start">
                        Reset Password
                    </h2>
                    <p className="text-gray-600 mb-8 text-start text-sm">
                        Enter your new password and confirm it to reset your password
                    </p>
                    <ResetPasswordForm token={token} />
                </div>
            </main>
        </div>
    )
}