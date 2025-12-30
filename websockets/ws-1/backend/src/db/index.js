import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const mongodbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/chat`);
        console.log(`mongoDb connected ${mongodbInstance.connection.host}`);

    } catch (error) {
        console.log("Error while connected to mongodb", error);
        process.exit(1)
    }
}