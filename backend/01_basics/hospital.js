const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    },
    {
        healthy: true
    },
    {
        healthy: true
    }]
}];

app.get("/", (req, res) => {
    const kidneys = users[0].kidneys;
    const numberOfKidneys = kidneys.length;

    const numberOfHealthyKidneys = kidneys.filter((k) => k.healthy).length

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys

    return res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
});

app.post("/", (req, res) => {
    const isHealthy = req.body;
    users[0].kidneys.push(isHealthy);

    return res.json({ msg: "Done" })
});

app.put("/", (req, res) => {
    const kidneys = users[0].kidneys;
    for (let i = 0; i < kidneys.length; i++) {
        users[0].kidneys[i].healthy = true
    }

    return res.json({ msg: "updated" })
});

app.delete("/", (req, res) => {
    // Check
    const isUnhealthyKidneyThere = users[0].kidneys.some((k) => k.healthy === false);
    if (!isUnhealthyKidneyThere) {
        return res.status(400).json({
            msg: "There is no unhealthy kidneys"
        })
    }

    users[0].kidneys = users[0].kidneys.filter((k) => k.healthy === true);
    return res.status(200).json({
        msg: "done"
    })
})

app.listen(port, () => {
    console.log(`app is listening to the port ${port}`);
})