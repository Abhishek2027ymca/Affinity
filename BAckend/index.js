
import express  from "express" ;
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import userRoute from  "./Routes/userRoute.js"
import { connect } from "mongoose";
import messageRoute from "./Routes/messageRoute.js"
dotenv.config({});// first it will be configured

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()) // body parser midlware 
app.use("/api/v1/user" , userRoute) ;// execurted on localhost:8080/api/v1/user

app.use("/api/v1/message", messageRoute)
app.listen(PORT , ()=>{
   connectdb();
   console.log(`server is listening to your port ${PORT}` );
   
})