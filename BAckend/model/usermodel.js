
import mongoose from "mongoose";
const userModel = mongoose.Schema({
    fullName : {
        type : String, required : true 
    },
    username : {
        type : String, required : true , unique : true
    },
    email : {
        type : String, required : true
    },
    password : {
        type : String, required : true  
    }
    , profilePhoto :{
        type : String, default : ""
    }
    ,
    gender :{
        type : String ,
        enum : ["male " , "female" ],
        required : true
    }

    }
)

export default mongoose.model("User", userModel)
