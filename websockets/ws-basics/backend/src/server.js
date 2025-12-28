import express from "express"
import { createServer } from "http";
import { Server } from "socket.io"


const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true
    }
})


io.on("connection", (socket) => {
    console.log(socket);

})

app.get("/", (req, res) => {
    return res.send("hello")
})

server.listen(3000)