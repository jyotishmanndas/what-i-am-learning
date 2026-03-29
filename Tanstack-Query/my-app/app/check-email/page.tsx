"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";

const CheckEmailPage = () => {
    const params = useSearchParams();
    const router = useRouter();

    const email = params.get("email");

    return (
        <div className="min-h-screen flex items-center justify-center px-4 font-mono">
            <div className="w-full max-w-md rounded-xl p-8 text-center shadow-lg">
                <div className="flex justify-center mb-4">
                    <div className="bg-[#009698] p-4 rounded-full text-white">
                        <Mail className="h-6 w-6" />
                    </div>
                </div>
                <h2 className="text-xl font-semibold">
                    Check your email
                </h2>
                <p className="mt-3 text-sm text-neutral-400">
                    We’ve sent a password reset link to
                </p>

                <p className="mt-1 font-medium text-neutral-400">
                    {email}
                </p>

                <div className="mt-6 bg-neutral-200 text-neutral-400 text-sm px-4 py-3 rounded-md">
                    If you don’t see the email, check your spam folder.
                </div>

                <button
                    onClick={() => router.push("/forgot-password")}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-200 border border-neutral-200 rounded-lg hover:bg-neutral-300 transition"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to reset password
                </button>

                <button
                    onClick={() => router.push("/login")}
                    className="mt-4 text-sm text-neutral-400 hover:text-neutral-500 transition cursor-pointer"
                >
                    Back to sign in
                </button>
            </div>
        </div>
    );
};

export default CheckEmailPage;