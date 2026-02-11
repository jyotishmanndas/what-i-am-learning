import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: Number(process.env.REDIS_PORT)
    }
})


client.on("connect", () => {
    console.log(`Redis connected successfully`);
});

client.on("error", (err) => {
    console.log(`Redis connection error`, err);
});


export const connectRedis = async () => {
    try {
       if(!client.isOpen){
        await client.connect()
       }
    } catch (error) {
        console.log(`Failed to connect to redis`, error);
        process.exit(1);
    }
};

export const redisClient = client;