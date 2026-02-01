import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const instance = await mongoose.connect(`${process.env.MONGODB_URI}/e-comm`);
        console.log("\n mongoDb connected successfully", instance.connection.host);
    } catch (error) {
        console.log("Error while connect to mongoDb", error);
    }
};