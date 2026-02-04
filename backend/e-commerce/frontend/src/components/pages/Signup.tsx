import React from 'react'
import SIgnupForm from '../forms/SIgnupForm'

const Signup = () => {
    return (
        <div className="min-h-screen bg-[#F3FFFF] flex flex-col">
            <main className="flex-1 flex flex-col justify-center px-6 pb-12">
                <div className="w-full max-w-md mx-auto shadow-2xl px-6 py-5 rounded-lg font-mono">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                        Create your account
                    </h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Enter your details to get started
                    </p>
                    <SIgnupForm />
                </div>
            </main>
        </div>
    )
}

export default Signup