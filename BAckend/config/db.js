import mongoose from "mongoose";
import dotenv from "dotenv";
import {connect} from "mongoose";

dotenv.config({});// first it will be configured
// then the database connection will be established

const connectdb = async ()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>
    {
        console.log("database connected");
        
    }).catch((error)=>{
        console.log(error);
        
    })
}
//any error her ? 
// 
export default connectdb;

// any error here ?
// 