import express, { urlencoded } from "express";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./db/index.js";
import { initializeSocket } from "./socket/socket.js";
import userRoute from "./routes/user.routes.js"
import roomRoute from "./routes/room.routes.js";


const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

initializeSocket(server);

connectDb();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/room", roomRoute);



server.listen(PORT, () => {
    console.log(`Server is listening to the port ${PORT}`);
})



