
import express  from "express" ;
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import { connect } from "mongoose";

dotenv.config({});// first it will be configured

const PORT = process.env.PORT || 5000;

const app = express();
// creating login logic 
// app.post("/login" , (req ,  res)=>{})

// app.post("/register")


app.listen(PORT , ()=>{
   connectdb();
   console.log(`server is listening to your port ${PORT}` );
   
})