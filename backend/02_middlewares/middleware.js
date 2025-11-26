const express = require("express");

const app = express();
const port = 3000;


// normal approach

// app.get("/", (req, res) => {
//     const username = req.headers.username;
//     const password = req.headers.password;
//     const kidneyId = req.query.kidneyId;

//     if (username !== "jyoti" && password !== "12345") {
//         return res.status(403).json({ msg: "Invalid credentials" })
//     }

//     if (kidneyId != 1 && kidneyId != 2) {
//         return res.status(411).json({ msg: "Wrong inputs" })
//     }

//     res.json({
//         msg: "Your kidney is healthy"
//     })
// })


// app.listen(port, () => {
//     console.log(`Server is listening on the port ${port}`);
// })

app.use(express.json()) // Middleware to parse JSON in the request body

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    if (username !== "jyoti" && password !== 12345) {
        return res.status(403).json({ msg: "Invalid credentials" })
    } else {
        next()
    }
}

function kidneyMiddleware(req, res, next) {
    const kidneyId = req.query.kidneyId;

    if (kidneyId != 1 && kidneyId != 2) {
        return res.status(411).json({ msg: "Wrong inputs" })
    } else {
        next()
    }
}


app.get("/heart-checkup", userMiddleware, kidneyMiddleware, (req, res) => {
    res.send('Your heart is healthy!');
})

app.get('/kidney-check', userMiddleware, kidneyMiddleware, (req, res) => {
    res.send('Your kidney is healthy!');
});

app.get('/health-checkup', userMiddleware, (req, res) => {
    res.send('Your health is fine!');
});


app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
})