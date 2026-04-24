import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import { User } from "./models/user.model.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


async function connectDb() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/docker`);
        console.log("db connected successfully");
    } catch (error) {
        console.log("db connection error", error);
        process.exit(1)
    }
};

connectDb()

app.get("/", (req: Request, res: Response) => {
    res.json({ msg: "Healthy server" })
});

app.post("/", async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        const user = await User.create({
            name, email
        });

        return res.status(201).json(user);
    } catch (error) {
        console.log("Error while creating", error);
        return res.status(500).json({ msg: "Internal server error" })
    };
});

app.get("/users", async (req: Request, res: Response) =>{
    try {
        const users= await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log("Error  getting users", error);
        return res.status(500).json({ msg: "Internal server error" })
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening to the port ${PORT}`)
})