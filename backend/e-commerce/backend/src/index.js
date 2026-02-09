import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDb } from "./db/db.js";
import { connectRedis } from "./config/redis.js";


const PORT = process.env.PORT || 3000;


async function startServer() {
    try {
        await connectDb();
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`Server is running on the port ${PORT}`);
        });
        
    } catch (error) {
        console.log(`Server failed to start: `, error);
        process.exit(1)
    }
}

startServer();

