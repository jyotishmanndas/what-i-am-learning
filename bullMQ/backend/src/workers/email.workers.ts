import { Worker } from "bullmq";
import bullmqConnection from "../config/bullMQ";
import { sendWelcomeEmail } from "../services/email.service";

const emailWorker = new Worker(
    "email",
    async (job) => {
        try {
            if (job.name === "welcomeEmail") {
                await sendWelcomeEmail(job.data)
            }
        } catch (error) {
            console.log(`Job ${job.id} failed`, error);
        }
    },
    {
        connection: bullmqConnection,
        concurrency: 5
    }
);

emailWorker.on("completed", (job) => {
    console.log(`Email sent: ${job.id}`);
})

emailWorker.on("failed", (job, err) => {
    console.log(`Email failed ${job?.id}: `, err.message);
});