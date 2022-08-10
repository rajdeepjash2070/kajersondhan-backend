const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    avatar:{
        type:String,
    },
    address:{
type:String,
    },
    cloudinary_id:{
        type:String,
    },
    phnumber:{
        type:String,
    },
    description:{
        type:String,
    },
    basis:{
        type:String,
    },
    timedu:{
        type:String,
    },
    compensation:{
        type:String,
    },
    longi:{
        type:String,
    },
    lati:{
        type:String,
    }
});

module.exports=mongoose.model("Admin",userSchema); 