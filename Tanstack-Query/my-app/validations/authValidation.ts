import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(3, { error: "First name must be at least 3 character long" }).max(10, { error: "Please keep it under 10 characters" }),
    lastName: z.string().min(3, { error: "Last name must be at least 3 character long" }).max(10, { error: "Please keep it under 10 characters" }).optional(),
    phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
    email: z.email(),
    password: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
});

export const forgotPasswordSchema = z.object({
    email: z.email()
});

export const updatePasswordSchema = z.object({
    newPassword: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' }),
    confirmPassword: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
})
  .refine((data)=>{
    if(data.newPassword){
        return data.newPassword === data.confirmPassword
    }
  }, {
    error: "Password do not match",
    path: ["confirmPassword"]
  })