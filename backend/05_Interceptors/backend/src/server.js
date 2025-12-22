import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import cors from "cors"
import { connectdb } from "./db/index.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


connectdb();

app.use("/api/v1/user", userRoute);



app.listen(port, () => {
    console.log(`Server is listening to the port ${port}`);
})
