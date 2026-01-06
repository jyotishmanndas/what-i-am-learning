import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});


io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on("send-location", (data) => {
        console.log("data received", data);
        io.emit("receive-location", data);
    });

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })
})

server.listen(3000, () => {
    console.log(`Server is running ont he port ${3000}`);
})