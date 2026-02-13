import mongoose from "mongoose";

// need to create a refrence b/w user and message model  , name oif the primary key databse
const messageModel =  new mongoose.Schema({
    senderId : {
        type :mongoose.Schema.Types.ObjectId, ref: "User",
        required : true}
        ,
        recievedId : {
            type :mongoose.Schema.Types.ObjectId, ref: "User",
            required : true 
        } ,
        message :{
            type : String ,
            required : true
        }
    
})

export const Message = mongoose.model("Message" , messageModel)