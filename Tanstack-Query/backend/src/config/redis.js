import { createClient } from "redis";
import config from "./environment.js";

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = config;

const client = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
});

client.on("connect", () => {
    console.log(`Redis connected successfully`);
});

client.on("error", (err) => {
    console.log(`Redis connection error`, err);
});

export const connectRedis = async () => {
    try {
        if (!client.isOpen) {
            await client.connect()
        }
    } catch (error) {
        console.log(`Failed to connect to redis`, error);
        process.exit(1);
    }
};


export const redisClient = client;