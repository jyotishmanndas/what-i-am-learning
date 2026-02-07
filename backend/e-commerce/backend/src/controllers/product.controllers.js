import mongoose from "mongoose";
import { uploadToIK } from "../lib/upload.js";
import { Product } from "../models/product.model.js";
import { imageSchema, productSchema, updateProductSchema } from "../validations/product.validation.js"
import { User } from "../models/user.model.js";
import { redisClient } from "../config/redis.js";

export const productController = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const body = { ...req.body };
        if (typeof body.price === "string") {
            try {
                body.price = JSON.parse(body.price);
            } catch (_) {
                body.price = req.body.price;
            }
        }
        const payload = productSchema.safeParse(body);
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
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const skip = (page - 1) * limit;

        const cachedProduct = await redisClient.get(`products`);
        if (cachedProduct) {
            return res.status(200)
                .json({
                    success: true,
                    msg: "succesfully fetched products",
                    products: JSON.parse(cachedProduct)
                })
        }

        const products = await Product.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)

        await redisClient.setEx(`products`, 600, JSON.stringify(products))
        return res.status(200).json({ success: true, msg: "succesfully fetched products", products })
    } catch (error) {
        console.log("Error while getting product", error);
        return res.status(500).json({ msg: "Internal server error while fetching products" })
    }
};

export const getUserProducts = async (req, res) => {
    try {
        if (!req.user._id) {
            return res.status(401).json({ msg: "unauthorized" })
        };

        const products = await Product.find({
            userId: req.user._id
        }).sort({ createdAt: -1 })

        return res.status(200).json({ sucess: true, msg: "user products fetched successfully", products })
    } catch (error) {
        console.log("Error while getting user products", error);
        return res.status(500).json({ msg: "Internal server error while fetching user products" })
    }
};

export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(404).json({ msg: "productId not found" })
        };

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product ID format" });
        };

        const cacheKey = `product:${productId}`
        const cachedproduct = await redisClient.get(cacheKey);
        if (cachedproduct) {
            return res.status(200)
                .json({
                    success: true,
                    msg: "Product fetched successfully",
                    product: JSON.parse(cachedproduct)
                })
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        };

        await redisClient.setEx(cacheKey, 600, JSON.stringify(product));

        return res.status(200).json({ success: true, msg: "Product fetched successfully", product })
    } catch (error) {
        console.log("Error while fetching product with id", error);
        return res.status(500).json({ msg: "Internal server error while fetching product with id" })
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(404).json({ msg: "product Id not found" })
        };

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product Id format" })
        };

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        };

        if (product.userId.toString() !== req.user._id.toString()) {
            return res.status(400).json({ msg: "You are not allowed to update this product" });
        };

        const payload = updateProductSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({ msg: "Invalid inputs", error: payload.error.issues })
        };

        const updateData = {};
        if (payload.data.productName) updateData.productName = payload.data.productName;
        if (payload.data.productDescription) updateData.productDescription = payload.data.productDescription;
        if (payload.data.price !== undefined) updateData.price = payload.data.price;

        await Product.findByIdAndUpdate(product._id, {
            $set: { updateData }
        }, { new: true, runValidators: true });

        return res.status(200).json({ msg: "Product updated successfully" });

    } catch (error) {
        console.log("Error while updating the product", error);
        return res.status(500).json({ msg: "Internal server error while updating the product" })
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(404).json({ msg: "product id not found" });
        };

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product Id format" })
        };

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" })
        };

        if (product.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "You are not allowed to delete this product" })
        };

        await Product.findByIdAndDelete(productId);

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { products: product._id }
        });

        return res.status(200).json({ success: true, msg: "Product deleted successfully" });

    } catch (error) {
        console.log("Error while deleting the product", error);
        return res.status(500).json({ msg: "Internal server error while deleting the product" })
    }
};