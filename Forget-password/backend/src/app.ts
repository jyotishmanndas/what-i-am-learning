import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors({
    origin: process.env.CORS,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);


export default app;