import mongoose from "mongoose";
import config from "./environment.js";

const { MONGODB_URI } = config

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error while connect to mongoDb", error);
        process.exit(1);
    }
};