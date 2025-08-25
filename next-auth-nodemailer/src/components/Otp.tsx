import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface OtpProps {
    email: string
}

export function Otp({ email }: OtpProps) {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="max-w-xl flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-center text-white">
                    Welcome to the Auth Page!
                </div>
                <div className="w-full mt-4 flex flex-col items-center gap-3">
                    <Input className="text-white" disabled value={email}  />
                    <Input type="email" placeholder="Enter your OTP" />
                    <Button variant="secondary" className="w-full p-5 cursor-pointer">
                        Continue with your email
                    </Button>
                </div>
            </div>
        </div>
    )
}