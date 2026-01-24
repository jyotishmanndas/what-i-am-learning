import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db";
import userRoutes from "./routes/user.routes";
import bookingRoutes from "./routes/booking.route";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser());

connectDB();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/booking", bookingRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})