import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.routes.js"
import { connectDb } from "./db/index.js";


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


connectDb();

app.use("/api/v1/user", userRoute);



app.listen(PORT, () => {
    console.log(`Server is listening to the port ${PORT}`);
})



