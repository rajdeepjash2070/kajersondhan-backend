const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    contactnumber:{
        type:String,
    },
    avatar:{
        type:String,
    },
    cloudinary_id:{
        type:String,
    },
    
});

module.exports=mongoose.model("Adminregister",userSchema); 