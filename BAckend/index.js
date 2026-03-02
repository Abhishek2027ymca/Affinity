import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import userRoute from "./Routes/userRoute.js";
import messageRoute from "./Routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";  // ✅ Add this


dotenv.config({});

const PORT = process.env.PORT || 5000;

const app = express();


app.use(express.urlencoded({extended:true})); // imporrtant for backend to fromntemnd iput taking 
app.use(express.json());
app.use(cookieParser());


const corsOption = {
    origin:'http://localhost:3000',
    credentials : true 
}
app.use(cors(corsOption)); // very important for backend to accept request from frontend  and also to send cookie to frontend  for authentication purpose


// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT, () => {
    connectdb();
    console.log(`server is listening to your port ${PORT}`);
});