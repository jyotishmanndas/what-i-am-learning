import express from "express";
import cookiePaser from "cookie-parser"
import authRoutes from "./routes/auth.routes";


const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookiePaser());


app.use("/api/v1/auth", authRoutes);


export default app;