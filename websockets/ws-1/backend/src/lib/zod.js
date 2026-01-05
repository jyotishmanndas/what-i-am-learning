import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().min(3, { error: "Username must be at leat 2 characters long" }),
    email: z.email(),
    password: z.string()
        .min(6, { error: "Password must be at least 6 characters long" })
        .max(18, { error: "Password must be at most 18 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
})

export const signInSchema = z.object({
    email: z.email(),
    password: z.string()
        .min(6, { error: "Password must be at least 6 characters long" })
        .max(18, { error: "Password must be at most 18 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
})

export const roomSchema = z.object({
    slug: z.string()
})