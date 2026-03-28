import config from "./environment.js";

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = config

const bullmqConnection = {
    REDIS_PORT: REDIS_PORT,
    REDIS_PASSWORD: REDIS_PASSWORD,
    REDIS_HOST: REDIS_HOST
}

export default bullmqConnection;