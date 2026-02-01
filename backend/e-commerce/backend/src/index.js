import dotenv from "dotenv";
dotenv.config();
import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/public", express.static("public"));



app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})