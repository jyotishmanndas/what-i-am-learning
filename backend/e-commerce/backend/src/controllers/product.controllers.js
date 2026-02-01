import mongoose from "mongoose";
import { uploadToIK } from "../lib/upload.js";
import { Product } from "../models/product.model.js";
import { imageSchema, productSchema } from "../validations/product.validation.js"
import { User } from "../models/user.model.js";

export const productController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const payload = productSchema.safeParse(req.body);
        if (!payload.success) {
            await session.abortTransaction()
            return res.status(400).json({ msg: "Invalid inputs", error: payload.error.issues })
        };

        const images = req.files;
        if (!images || images.length === 0) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Image is required" })
        };

        const imageCheck = imageSchema.safeParse(images);
        if (!imageCheck.success) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Invalid file" })
        };

        const existingProduct = await Product.findOne({
            productName: payload.data.productName
        }).session(session)

        if (existingProduct) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Product already exists with this name" })
        };

        const uploadImages = await Promise.all(
            imageCheck.data.map(async (u) => await uploadToIK(u.buffer, u.originalname))
        );

        const product = await Product.create([{
            productName: payload.data.productName,
            productDescription: payload.data.productDescription,
            price: payload.data.price,
            image: uploadImages.map((u) => u.url),
            userId: req.user._id
        }], { session });

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: {
                products: product[0]._id
            }
        }, { session, new: true });

        await session.commitTransaction();
        return res.status(201).json({ success: true, msg: "Product created successfully" })
    } catch (error) {
        await session.abortTransaction();
        console.log("Error while create product", error);
        return res.status(500).json({ msg: "Internal server error while creating product" })
    } finally {
        session.endSession();
    }
};

export const getAllProducts = async (req, res) => {
    try {

    } catch (error) {

    }
}