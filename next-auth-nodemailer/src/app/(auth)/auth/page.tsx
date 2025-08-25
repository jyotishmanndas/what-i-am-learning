"use client";

import { Email } from "@/components/Email";
import { Otp } from "@/components/Otp";
import { useState } from "react";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState("email");

    return (
        <div className="min-h-screen w-full bg-[#171717] flex items-center justify-center">
            {step === "email" && <Email setEmail={setEmail} setStep={setStep} email={email} />}
            {step === "otp" && <Otp email={email} />}
        </div>
    )
}