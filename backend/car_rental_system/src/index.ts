import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser());
app.use()



app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})