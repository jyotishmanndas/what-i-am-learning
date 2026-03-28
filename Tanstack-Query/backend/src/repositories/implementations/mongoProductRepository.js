import Product from "../../models/product.model.js";
import AppError from "../../utils/error.js";
import IProductRepository from "../contracts/IProductRepository.js";

class MongoProductRepository extends IProductRepository {
    async createProduct(productData) {
        try {
            const product = await new Product(productData);
            const saveProduct = await product.save();
            return saveProduct
        } catch (error) {
            console.log("Error while create product", error);
            throw new AppError(`Failed to create product: ${error.message}`, 500, error)
        }
    };

    async findProductByTitle(productTitle) {
        try {
            const product = await Product.findOne({ title: productTitle });
            return product
        } catch (error) {
            throw new AppError(`Failed to find product with this title: ${error.message}`, 400, error)
        }
    };

    async getAllProducts() {
        try {
            const products = await Product.find();
            return products
        } catch (error) {
            throw new AppError(`Failed to fetch products: ${error.message}`, 400, error)
        }
    };

    async getProductById(productId) {
        try {
            const product = await Product.findById(productId)
            return product;
        } catch (error) {
            throw new AppError(`Failed to find product: ${error.message}`, 400, error)
        }
    };

    async updateProduct(productId, productData) {
        try {
            const product = await Product.findByIdAndUpdate(productId, {
                $set: productData
            });
            return product
        } catch (error) {
            throw new AppError(`Failed to update product`, 500, error)
        }
    };


    async deleteProduct(productId) {
        try {
            const product = await Product.findByIdAndUpdate(productId);
            return product;
        } catch (error) {
            throw new AppError(`Failed to delete product`, 500, error)
        }
    };

}

export default MongoProductRepository