import mongoose from "mongoose";


const conversationModel = new mongoose.Schema({

    participants:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
    ,
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
     }]
} 
, { timestamps : true })


// we have used timestamps to get the createdAt and updatedAt fields in the conversation model

// messages is an array 