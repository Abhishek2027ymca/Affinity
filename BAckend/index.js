import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import userRoute from "./Routes/userRoute.js";
import messageRoute from "./Routes/messageRoute.js";
import cookieParser from "cookie-parser";

dotenv.config({});

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT, () => {
    connectdb();
    console.log(`server is listening to your port ${PORT}`);
});