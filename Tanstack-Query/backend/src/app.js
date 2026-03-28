import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import config from "./config/environment.js"

const app = express();

const { FRONTEND_URL } = config;

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "true" }))
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);

app.use(errorMiddleware);

export default app

