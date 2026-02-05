import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, { error: "Name must be at least 3 character long" }).max(10, { error: "Please keep it under 10 characters" }),
    email: z.email(),
    mobile: z.string().min(10, "Please provide a valid number").max(10),
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

export const profileUpdateSchema = z.object({
    name: z.string().min(3).max(10).optional(),
    newPassword: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
        .optional(),

    confirmPassword: z.string()
        .min(6, { error: "Passoword must be at least 6 characters long" })
        .max(20, { error: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { error: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { error: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { error: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { error: 'Password must contain at least one special character' })
        .optional()
})
    .refine(data => data.name || data.newPassword, {
        error: "At least one field required"
    })
    .refine(data => {
        if (data.newPassword)
            return data.newPassword === data.confirmPassword;
        return true;
    }, {
        error: "Passwords do not match",
        path: ["confirmPassword"]
    });


export const productSchema = z.object({
    productName: z.string().min(3, { message: "Product name must be at least 3 characters" }),
    productDescription: z.string().min(5, { message: "Description must be at least 5 characters" }).optional(),
    price: z.object({
        amount: z.coerce.number().positive({ message: "Price must be a positive number" }),
        currency: z.enum(["INR", "$"]).default("INR")
    })
});

// export const FileSchema = z.object({
//     originalname: z.string().min(1, "Filename required"),
//     mimetype: z.string().min(1, { error: "Mimetype is required" })
//         .refine((file) => file.startsWith("image/"), {
//             error: "File must be an image",
//             path: ["mimetype"]
//         }),
//     size: z.number()
//         .nonnegative({ error: "File size must be non-negative" })
//         .max(5 * 1024 * 1024, "Max file size is 5MB"),
//     buffer: z.instanceof(File)
// })

// export const imageSchema = z.array(FileSchema)
//     .min(1, "At least one image required")
//     .max(5, "Maximum 5 images allowed");

/** Form schema for create product: productSchema + images (File[]) validated with FileSchema rules */
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const imageFileSchema = z.instanceof(File)
    .refine((f) => f.name?.length, "Filename required")
    .refine((f) => f.type.startsWith("image/"), "File must be an image")
    .refine((f) => f.size >= 0, "File size must be non-negative")
    .refine((f) => f.size <= MAX_FILE_SIZE, "Max file size is 5MB");

export const createProductFormSchema = productSchema.extend({
    images: z.array(imageFileSchema)
        .min(1, "At least one image required")
        .max(5, "Maximum 5 images allowed"),
});

export const updateProductSchema = z.object({
    productName: z.string().min(3).optional(),
    productDescription: z.string().min(5).optional(),
    price: z.object({
        price: z.coerce.number().positive(),
        currency: z.enum(["INR", "$"])
    }).optional()
})