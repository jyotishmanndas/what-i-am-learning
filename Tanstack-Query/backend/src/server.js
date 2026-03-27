import app from "./app.js";
import { connectDB } from "./config/database.js";
import config from "./config/environment.js"

const { PORT } = config;


const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is listening to the port ${PORT}`);
        })
    } catch (error) {
        console.log(`Server failed to start`, error);
        process.exit(1)
    }
};


startServer()