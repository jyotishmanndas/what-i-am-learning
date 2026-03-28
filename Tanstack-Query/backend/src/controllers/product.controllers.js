import mongoose from "mongoose";
import ProductService from "../services/product.service.js"
import AppError from "../utils/error.js";

class ProductController {
    constructor() {
        this.productService = new ProductService()
    }

    createProduct = async (req, res, next) => {
        try {
            const productData = req.body;
            const result = await this.productService.createProduct(productData);

            res.status(201).json({ success: true, msg: "Product created successfully", result })
        } catch (error) {
            next(error)
        }
    };

    getAllProducts = async (req, res, next) => {
        try {
            const result = await this.productService.getAllProducts();
            res.status(200).json({ success: true, msg: "Products fetched successfully", result })
        } catch (error) {
            next(error)
        }
    };

    getProductById = async (req, res, next) => {
        try {
            const { productId } = req.params;
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw new AppError("Invalid product id", 400)
            };

            const result = await this.productService.getProductById(productId);

            res.status(200).json({ success: true, msg: "product fetched successfully", result })
        } catch (error) {
            next(error)
        }
    };

    updateProduct = async (req, res, next) => {
        try {
            const { productId } = req.params;
            const productData = req.body;

            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw new AppError("Invalid product id", 400)
            };

            const result = await this.productService.updateProduct(productId, productData);

            res.status(200).json({success: true, msg: "Product updated successfully", result})

        } catch (error) {
            next(error)
        }
    };

    deleteProduct = async (req, res, next) => {
        try {
            const { productId } = req.params;
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                throw new AppError("Invalid product id", 400)
            };

            await this.productService.deleteProduct(productId);

            res.status(200).json({success: true, msg: "Product deleted successfully"})
        } catch (error) {
            next(error)
        }
    }
};

export default new ProductController