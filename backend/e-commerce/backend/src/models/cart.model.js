import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            productId: {
                types: mongoose.Schema.types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            }
        }
    ]
});

export const Cart = mongoose.model("Cart", cartSchema)