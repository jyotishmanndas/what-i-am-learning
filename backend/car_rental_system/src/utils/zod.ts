import { z } from "zod";

export const signUpSchema = z.object({
    userName: z.string().min(2).max(10),
    name: z.string().min(2).max(10),
    password: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
});


export const signInSchema = z.object({
    userName: z.string().min(2).max(10),
    password: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
})