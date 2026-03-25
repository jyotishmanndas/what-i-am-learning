import SIgnupForm from '@/components/forms/SIgnupForm'
import React from 'react'

const Signup = () => {
    return (
        <main className="flex flex-1 flex-col justify-center px-4 pb-10 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md">
                <div className="rounded-3xl border border-border/70 bg-card/80 px-6 py-7 shadow-lg shadow-black/2 backdrop-blur-sm sm:px-8 sm:py-9">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                            Create your account
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Enter your details to get started in a few seconds.
                        </p>
                    </div>
                    <SIgnupForm />
                </div>
            </div>
        </main>
    )
}

export default Signup