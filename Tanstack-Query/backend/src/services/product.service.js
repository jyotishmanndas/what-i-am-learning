import MongoProductRepository from "../repositories/implementations/mongoProductRepository.js";
import AppError from "../utils/error.js";

class ProductService {
    constructor() {
        this.productRepository = new MongoProductRepository()
    }

    async createProduct(productData) {
        const { title } = productData
        const existingProduct = await this.productRepository.findProductByTitle(title);
        if (!existingProduct) {
            throw new AppError("Product not found", 400)
        };

        const product = await this.productRepository.createProduct(productData);
        return product;
    };

    async getAllProducts() {
        const allProducts = await this.productRepository.getAllProducts();
        return allProducts
    };

    async getProductById(productId) {
        const product = await this.productRepository.getProductById(productId);
        return product;
    };

    async updateProduct(productId, productData) {
        const updateBody = {};

        if (productData.title) updateBody.title = productData.title;
        if (productData.description) updateBody.description = productData.description;
        if (productData.price) updateBody.price = productData.price;
        if (productData.category) updateBody.category = productData.category;


        const product = await this.productRepository.updateProduct(productId, updateBody);
        if (!product) {
            throw new AppError(`product not found`, 404)
        };

        return product
    };

    async deleteProduct(productId){
        const product = await this.productRepository.deleteProduct(productId);
        if(!product){
            throw new AppError("Product not found", 404)
        };

        return product
    }
};

export default ProductService