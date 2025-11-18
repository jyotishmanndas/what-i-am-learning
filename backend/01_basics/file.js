const express = require("express");
const fs = require("fs");

const app = express();

app.get("/file/:fileName", (req, res) => {
    const name = req.params.fileName;
    fs.readFile(name, "utf-8", (err, data) => {
        return res.json({
            data
        })
    })
})


app.listen(3000);