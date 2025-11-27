const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");

const jwtPassword = "12345";

const app = express();

const port = 3000;

app.use(express.json());

const signupSchema = zod.object({
    username: zod.string().min(2),
    email: zod.email(),
    password: zod.string().min(6, { error: "password must be alteast 6 character long" })
})

app.post("/signin", (req, res) => {
    const respone = signupSchema.safeParse(req.body);

    if (!respone.success) {
        return res.status(400).json({
            msg: "Inavlid inputs"
        })
    }

    const username = req.body.username;
    const token = jwt.sign({ username }, jwtPassword);

    return res.json({
        token
    })
})


app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, jwtPassword);
    // jwt.verify returns an object
    console.log(decode);

    res.json({
        msg: decode.username
    })
})

app.listen(port, () => {
    console.log(`Server is listening to the port ${port}`);
})