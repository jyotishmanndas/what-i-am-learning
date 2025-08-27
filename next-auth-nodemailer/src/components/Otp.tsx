"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OtpProps {
    email: string
}

export function Otp({ email }: OtpProps) {
    const [otp, setOtp] = useState("");
    const router = useRouter();

    const sentOtp = async () => {
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                otp
            });

            if (res.ok) {
                toast.success("SignIn successful")
                router.push("/dashboard")
            }
        } catch (error) {
            toast.error("SignIn failed")
        }
    }

    return (
        <div className="h-full flex items-center justify-center">
            <div className="max-w-xl flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-center text-white">
                    Welcome to the Auth Page!
                </div>
                <div className="w-full mt-4 flex flex-col items-center gap-3 text-white font-semibold">
                    <Input disabled value={email} />
                    <Input onChange={(e) => setOtp(e.target.value)} type="text" placeholder="Enter your OTP" />
                    <Button onClick={sentOtp} variant="secondary" className="w-full p-5 cursor-pointer">
                        Continue with your email
                    </Button>
                </div>
            </div>
        </div>
    )
}