import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDB } from "./db/db";


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();


        app.listen(PORT, () => {
            console.log(`Server is running on the port ${PORT}`)
        });

    } catch (error) {
        console.log(`Server failed to start:`, error);
        process.exit(1)
    }
}

startServer()


