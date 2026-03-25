import LoginForm from '@/components/forms/LoginForm'
import React from 'react'

const Login = () => {
    return (
    <main className="flex flex-1 flex-col justify-center px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-3xl border border-border/70 bg-card/80 px-6 py-7 shadow-lg shadow-black/2 backdrop-blur-sm sm:px-8 sm:py-9">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to continue shopping.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
    )
}

export default Login