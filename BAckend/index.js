
import express  from "express" ;
import dotenv from "dotenv";
import connectdb from "./config/db";
import { connect } from "mongoose";

dotenv.config({});// first it will be configured

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT , ()=>{
   connectdb();
   console.log(`server is listening to your port ${PORT}` );
   
})