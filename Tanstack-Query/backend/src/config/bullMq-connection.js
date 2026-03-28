import config from "./environment.js";

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = config

const bullmqConnection = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    maxRetriesPerRequest: null
};

export default bullmqConnection;