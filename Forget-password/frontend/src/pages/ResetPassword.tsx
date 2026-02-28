import React from 'react'
import { useSearchParams } from 'react-router';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col justify-center px-6">
                <div className="w-full max-w-sm mx-auto shadow-xl rounded-lg px-6 py-5 font-mono">
                    <h2 className="text-3xl font-bold text-black mb-8 text-center">
                        Enter your details
                    </h2>
                    <ResetPasswordForm token={token} />
                </div>
            </main>
        </div>
    )
}

export default ResetPassword