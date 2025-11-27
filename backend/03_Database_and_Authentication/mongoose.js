const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const mongoose = require("mongoose");

const jwtPassword = "12345";
const port = 3000;

mongoose.connect(`mongodb://localhost:27017`);

const app = express();
app.use(express.json());

const User = mongoose.model("user", {
    username: String,
    email: String,
    password: String
})

const signupSchema = zod.object({
    username: zod.string().min(2),
    email: zod.email(),
    password: zod.string().min(6, { error: "password must be alteast 6 character long" })
});

const signinSchema = zod.object({
    email: zod.email(),
    password: zod.string().min(6, { error: "password must be alteast 6 character long" })
})

app.post("/signup", async (req, res) => {
    const response = signupSchema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).json({
            msg: "Invalid inputs"
        })
    }

    const existingUser = User.findOne({
        email: response.data.email
    })

    if (existingUser) {
        return res.status(400).json({
            msg: "User already exists with this email"
        })
    };

    const newUser = await User.create({
        username: response.data.username,
        email: response.data.email,
        password: response.data.password
    });

    const username = newUser._id
    const token = jwt.sign({ username }, jwtPassword);

    return res.json({
        msg: "Signup successfull",
        token
    })
})


app.post("/signin", (req, res) => {
    const response = signinSchema.safeParse(req.body);

    if (!response.success) {
        if (!response.success) {
            return res.status(400).json({
                msg: "Invalid inputs"
            })
        }
    }

    const existingUser = User.findOne({
        email: response.data.email
    })

    if (!existingUser) {
        return res.status(400).json({
            msg: "User does not exist with this email"
        })
    }

    const userId = existingUser._id;
    const token = jwt.sign({ userId }, jwtPassword);

    return res.json({
        msg: "Signin successfull",
        token
    })

})

app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
})