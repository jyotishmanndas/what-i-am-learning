const express = require("express");

const app = express();

function CalculateSum(n) {
    let ans = 0;
    for (let i = 0; i < n; i++) {
        ans += i
    }
    return ans;
}

// req: request
// res: response

app.get("/", (req, res) => {
    const n = req.query.n;
    const total = CalculateSum(n);
    res.send(total.toString())
});

app.listen(3000);