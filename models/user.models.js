const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : true ,
        trim:true,
        lowercase:true,
        unique:true ,
        minlength:[3,"username must of atlease 3 character long"]
    },
    email:{
        type:String,
        required:true ,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,"email must be of 13 characters "]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[8,"password must be of 8 characters"]
    }
})


const user = mongoose.model("user",userSchema)
module.exports = user 