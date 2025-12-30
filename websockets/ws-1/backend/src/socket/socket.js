import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socket.middleware";

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173"],
            credentials: true
        }
    });

    io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {
        console.log("connected", socket.id);

        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id} joined ${roomId} room `);
        });

        socket.on("send-message", ({ roomId, msg }) => {
            io.to(roomId).emit("received-message", msg);
            console.log(`Message sent successfully to ${roomId}`);
        })
    })
}