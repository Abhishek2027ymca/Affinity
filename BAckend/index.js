
import express  from "express" ;
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import userRoute from  "./Routes/userRoute.js"
import { connect } from "mongoose";
import cookieParser from "cookie-parser";


dotenv.config({});// first it will be configured

const PORT = process.env.PORT || 5000;

const app = express();

// ✅ ADD THESE MIDDLEWARE IN THIS ORDER:
app.use(express.json());  // Parse JSON body - CRITICAL!
// app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(cookieParser());  // Parse cookies

app.use("/api/v1/user" , userRoute) ;// execurted on localhost:8080/api/v1/user

app.listen(PORT , ()=>{
   connectdb();
   console.log(`server is listening to your port ${PORT}` );
   
})