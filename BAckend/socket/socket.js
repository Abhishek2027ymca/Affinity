import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: (process.env.FRONTEND_URL || "http://localhost:3000").replace(/\/+$/, ""),
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const userSocketMap = {}; // { userId -> socketId }

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // typing indicator: relay straight to the other person
    socket.on("typing", ({ to }) => {
        const receiverSocketId = getReceiverSocketId(to);
        if (receiverSocketId) io.to(receiverSocketId).emit("typing", { from: userId });
    });

    socket.on("stopTyping", ({ to }) => {
        const receiverSocketId = getReceiverSocketId(to);
        if (receiverSocketId) io.to(receiverSocketId).emit("stopTyping", { from: userId });
    });

    socket.on("disconnect", () => {
        // on a quick refresh the new socket connects before the old one disconnects,
        // so only remove the entry if it still belongs to *this* socket
        if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
