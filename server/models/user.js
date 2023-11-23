const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    birhday:{
        type:Date,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    tel:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    ability:{
        type:String
    },
    education:{
        type:String
    },
    experience:{
        type:String
    },
    link_html:{
        type:String
    },
    name_img:{
        type:String
    },
    name_pdf:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("user",userSchema)