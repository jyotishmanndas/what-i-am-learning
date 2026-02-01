import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use("/public", express.static("public"));


connectDb();

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})