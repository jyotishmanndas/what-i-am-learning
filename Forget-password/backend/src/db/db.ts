import mongoose from "mongoose";

export const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/forget-password`);
        console.log(`\n MongoDb connected ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("Error while connected to mongodb", error);
        process.exit(1)
    }
};
