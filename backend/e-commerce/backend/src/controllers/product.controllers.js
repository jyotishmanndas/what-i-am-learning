import { uploadToIK } from "../lib/upload.js";
import { Product } from "../models/product.model.js";
import { imageSchema, productSchema } from "../validations/product.validation.js"

export const productController = async (req, res) => {
    try {
        const payload = productSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: payload.error.issues })
        };

        const images = req.files;
        if (!images || images.length === 0) {
            return res.status(400).json({ msg: "Image is required" })
        };

        const imageCheck = imageSchema.safeParse(images);
        if (!imageCheck.success) {
            return res.status(400).json({ msg: "Invalid file" })
        };

        const existingProduct = await Product.findOne({
            productName: payload.data.productName
        })

        if (existingProduct) {
            return res.status(400).json({ msg: "Product already exists with this name" })
        };

        const uploadImages = await Promise.all(
            imageCheck.data.map(async (u) => await uploadToIK(u.buffer, u.originalname))
        );

        await Product.create({
            productName: payload.data.productName,
            productDescription: payload.data.productDescription,
            price: payload.data.price,
            image: uploadImages.map((u) => u.url),
            userId: req.user._id
        });

        return res.status(200).json({ success: true, msg: "Product created successfully" })
    } catch (error) {
        console.log("Error while create product", error);
        return res.status(500).json({ msg: "jyotishman" })
    }
}