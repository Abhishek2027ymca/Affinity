import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import userRoute from "./Routes/userRoute.js";
import messageRoute from "./Routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config({});

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    // trailing slashes would never match the browser's Origin header, so strip them
    origin: (process.env.FRONTEND_URL || "http://localhost:3000").replace(/\/+$/, ""),
    credentials: true,
};
app.use(cors(corsOption));

// health check (handy for hosting platforms)
app.get("/", (req, res) => res.status(200).json({ status: "ok", app: "Affinity" }));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Socket.IO lives in ./socket/socket.js, we only start the shared http server here
server.listen(PORT, () => {
    connectdb();
    console.log(`🚀 Server listening on port ${PORT}`);
});
