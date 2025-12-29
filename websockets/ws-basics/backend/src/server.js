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
});

io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on("message", (msg)=>{
        console.log(msg);
        io.emit("chat-message", msg)
    })
})


server.listen(3000, () => {
    console.log(`Server is listening to the port ${3000}`);
})