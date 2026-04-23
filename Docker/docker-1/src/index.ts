import express, { Request, Response } from "express"

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.get("/", (req: Request, res: Response) => {
    try {
        res.json({ msg: "Hello" })
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" })
    }
});


app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
})