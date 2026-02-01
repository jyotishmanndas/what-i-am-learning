import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
    },
    price: {
        amount: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            enum: ["INR", "$"],
            default: "INR"
        }
    },
    image: [
        {
            type: String,
            required: true
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);