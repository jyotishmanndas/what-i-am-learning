import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AuthPage() {
    return (
        <div className="min-h-screen w-full bg-[#171717] flex items-center justify-center">
            <div className="max-w-xl flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-center text-white">
                    Welcome to the Auth Page!
                </div>
                <div className="w-full mt-4 flex flex-col items-center gap-3">
                    <Input type="email" placeholder="Enter your email" />
                    <Button variant="secondary" className="w-full p-5 cursor-pointer">
                        Continue with your email
                    </Button>
                </div>
            </div>
        </div>
    )
}