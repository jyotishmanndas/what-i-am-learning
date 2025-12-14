import { z } from "zod";

export const signupSchema = z.object({
    fullName: z.string().min(2),
    username: z.string().min(4),
    email: z.email(),
    password: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
})

export const signinSchema = z.object({
    email: z.email(),
    password: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
})

export const updateProfileSchema = z.object({
    fullName: z.string(),
    newpassword: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' }),
    confirmpassword: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
        .refine((data) => data.newpassword === data.confirmpassword, {
            error: "Confirm password must match new password",
            path: ["confirmPassword"]
        })
});

export const videoSchema = z.object({
    title: z.string().min(3, { error: "Title must be at least 3 character long" }),
    description: z.string().min(10, { error: "Description must be al least character long" }).max(50)
});

export const fileMetaSchema = z.object({
    path: z.string().min(1, { error: "File path is required" }),
    mimetype: z.string().min(1, { error: "Mimetype is required" }),
    size: z.number().nonnegative({error: "File size must be non-negative"}),
});

export const imageFileSchema = fileMetaSchema
    .refine((file) => file.mimetype.startsWith("image/"), {
        error: "File must be an image",
        path: ["mimetype"]
    });

export const videoFileSchema = fileMetaSchema
    .refine((file) => file.mimetype.startsWith("video/"), {
        error: "File must be an video",
        path: ["mimetype"]
    });