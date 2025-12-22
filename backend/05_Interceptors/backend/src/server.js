import express from "express";
import dotenv from "dotenv";

dotenv.config();

import cookieParser from "cookie-parser"


const app = express();
const port = process.env.PORT || 3000

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.json({ msg: "Hello" })
})

app.listen(port, () => {
    console.log(`Server is listening to the port ${port}`);
})
