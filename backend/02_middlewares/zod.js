const express = require("express");
const zod = require("zod");

const app = express();
const port = 3000;

app.use(express.json());

// const schema = zod.array(zod.number());

// app.post("/", (req, res) => {
//     const kidneys = req.body.kidneys;
//     console.log(kidneys);

//     const response = schema.safeParse(kidneys);

//     if (!response.success) {
//         return res.status(403).json({
//             msg: "Invalid inputs",
//             err: response.error.message
//         })
//     }

//     res.status(200).json({
//         msg: "Your kidney is healthy"
//     })
// })


// app.listen(port, () => {
//     console.log(`Server is listening on the port ${port}`);
// })


const schema = zod.object({
    username: zod.string().min(2, { error: "Username must be atleast 2 character long" }),
    email: zod.email(),
    password: zod.string().min(6, { error: "Password must be at least 6 characters long" })
})

app.post("/", (req, res) => {
    const body = req.body;
    const response = schema.safeParse(body);

    if (!response.success) {
        return res.status(403).json({
            msg: "Invalid inputs",
            err: response.error.message
        })
    }

    res.status(200).json({
        msg: "Signup Successfully"
    })
})


app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
})