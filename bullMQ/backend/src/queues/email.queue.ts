import { Queue } from "bullmq"
import bullmqConnection from "../config/bullMQ"

export const emailQueue = new Queue("email", {
    connection: bullmqConnection,
    defaultJobOptions: {
        attempts: 5,
        backoff: {
            type: "exponential",
            delay: 3000
        },
        removeOnComplete: true,
        removeOnFail: false
    }
})