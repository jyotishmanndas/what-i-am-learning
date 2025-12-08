import { z } from "zod"

export const signupSchema = z.object({
    fullName: z.string().min(2),
    username: z.string().min(4),
    email: z.email(),
    password: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' })
});

export const signinSchema = z.object({
    email: z.email(),
    password: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' })
})