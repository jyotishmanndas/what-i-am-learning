import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

export const addToCartController = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(404).json({ msg: "product not found" })
        };

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product Id format" })
        };

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        };

        const user = await User.findById(req.user._id);
        // if (!user) {
        //     return res.status(400).json({ msg: "user not found" });
        // };

        const cart = await Cart.findById(user.cart);
        if (!cart) {
            return res.status(404).json({ msg: "cart not found" })
        };

        const existingProduct = cart.items.find((p) => p.productId.toString() === productId);
        if (existingProduct) {
            return res.status(400).json({ msg: "Product is already on cart" })
        };

        await Cart.findByIdAndUpdate(cart._id, {
            $addToSet: {
                items: {
                    productId: productId,
                    quantity: 1
                }
            }
        }, { new: true })

        return res.status(200).json({ success: true, msg: "product added to cart" })

    } catch (error) {
        console.log("Error while add to cart", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const incrementCartController = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(404).json({ msg: "product not found" })
        };

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product Id format" })
        };

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        };

        const user = await User.findById(req.user._id);
        // if (!user) {
        //     return res.status(400).json({ msg: "user not found" });
        // };

        const cart = await Cart.findById(user.cart);
        if (!cart) {
            return res.status(404).json({ msg: "cart not found" })
        };

        const existingItem = cart.items.find((p) => p.productId.toString() === productId);
        if (!existingItem) {
            return res.status(400).json({ msg: "Product not found in cart" })
        };

        await Cart.findOneAndUpdate(
            { _id: cart._id, "items.productId": productId },
            {
                $inc: {
                    "items.$.quantity": 1
                }
            }, { new: true });

        return res.status(200).json({ success: true, msg: "quantity incremented successfully" })
    } catch (error) {
        console.log("Error while increment the product", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const decrementCartController = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(404).json({ msg: "product not found" })
        };

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product Id format" })
        };

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        };

        const user = await User.findById(req.user._id);
        // if (!user) {
        //     return res.status(400).json({ msg: "user not found" });
        // };

        const cart = await Cart.findById(user.cart);
        if (!cart) {
            return res.status(404).json({ msg: "cart not found" })
        };

        const existingItem = cart.items.find((p) => p.productId.toString() === productId);
        if (!existingItem) {
            return res.status(400).json({ msg: "Product not found in cart" })
        };

        if (existingItem.quantity === 1) {
            return res.status(400).json({ msg: "You cannot decrement" })
        }

        await Cart.findOneAndUpdate(
            { _id: cart._id, "items.productId": productId },
            {
                $inc: {
                    "items.$.quantity": -1
                }
            }, { new: true });

        return res.status(200).json({ success: true, msg: "quantity decremented successfully" })
    } catch (error) {
        console.log("Error while decrement the product", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
};

export const removeFromCartController = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(404).json({ msg: "product not found" })
        };

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid product Id format" })
        };

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        };

        const user = await User.findById(req.user._id);
        // if (!user) {
        //     return res.status(400).json({ msg: "user not found" });
        // };

        const cart = await Cart.findById(user.cart);
        if (!cart) {
            return res.status(404).json({ msg: "cart not found" })
        };

        const existingItem = cart.items.find((p) => p.productId.toString() === productId);
        if (!existingItem) {
            return res.status(400).json({ msg: "Product not found in cart" })
        };

        await Cart.findByIdAndUpdate(cart._id, {
            $pull: {
                items: {
                    productId: productId
                }
            }
        }, { new: true })

        return res.status(200).json({ msg: "Product removed from cart" })
    } catch (error) {
        console.log("Error while removing the product", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
}