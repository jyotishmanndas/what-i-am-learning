import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios"

interface EmailProps {
    setEmail: (email: string) => void
    setStep: (step: string) => void
    email: string
}

export function Email({ setEmail, setStep, email }: EmailProps) {

    const sendOtp = async () => {
        const res = await axios.post(`/api/sentOtp`, { email })
    }

    return (
        <div className="h-full flex items-center justify-center">
            <div className="max-w-xl flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-center text-white">
                    Welcome to the Auth Page!
                </div>
                <div className="w-full mt-4 flex flex-col items-center gap-3">
                    <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
                    <Button onClick={sendOtp} variant="secondary" className="w-full p-5 cursor-pointer">
                        Continue with your email
                    </Button>
                </div>
            </div>
        </div>
    )
}