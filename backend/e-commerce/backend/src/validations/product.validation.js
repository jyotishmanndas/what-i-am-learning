import { z } from "zod";

export const productSchema = z.object({
    productName: z.string().min(3),
    productDescription: z.string().min(5).optional(),
    price: z.object({
        amount: z.number().positive(),
        currency: z.enum(["INR", "$"]).default("INR")
    })
});

export const FileSchema = z.object({
    originalname: z.string().min(1, "Filename required"),
    mimetype: z.string().min(1, { error: "Mimetype is required" })
        .refine((file) => file.startsWith("image/"), {
            error: "File must be an image",
            path: ["mimetype"]
        }),
    size: z.number()
        .nonnegative({ error: "File size must be non-negative" })
        .max(5 * 1024 * 1024, "Max file size is 5MB"),
    buffer: z.instanceof(Buffer)
})

export const imageSchema = z.array(FileSchema)
    .min(1, "At least one image required")
    .max(5, "Maximum 5 images allowed");