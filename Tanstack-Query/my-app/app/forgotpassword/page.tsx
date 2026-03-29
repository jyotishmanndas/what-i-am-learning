import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm"

export default function ForgotPassword() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col justify-center px-6">
                <div className="w-full max-w-sm mx-auto shadow-xl rounded-lg px-6 py-5 font-mono">
                    <h2 className="text-2xl font-bold text-black mb-1.5 text-startr">
                        Forgot Password
                    </h2>
                    <p className="text-gray-600 mb-8 text-start text-sm">
                        Enter your email to reset your password
                    </p>
                    <ForgotPasswordForm />
                </div>
            </main>
        </div>
    )
}