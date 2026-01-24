import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
        console.log("\n mongoDb coonected", connectionInstance.connection.host);
    } catch (error) {
        console.log("Error while connecting to mongoDb", error);
        process.exit(1)
    }
}