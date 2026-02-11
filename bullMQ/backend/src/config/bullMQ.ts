import dotenv from "dotenv";
dotenv.config();


const bullmqConnection = {
    host: process.env.REDIS_URL || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
};

export default bullmqConnection;