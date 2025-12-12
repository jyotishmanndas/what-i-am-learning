import express from "express";
import dotenv from 'dotenv';
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/index.js";
import userRoute from "./routes/user.route.js";
import videoRoute from "./routes/video.route.js";

const app = express();
const port = process.env.PORT || 3000

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

connectDB();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/video", videoRoute);


app.listen(port, () => {
    console.log(`Server is listening to the port ${port}`);
})