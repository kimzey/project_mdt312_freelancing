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
    details:{
        ability:{
            type:String
        },
        education:{
            type:String
        },
        Workh_istory:{
            type:String
        },
        link_html:{
            type:String
        },
        name_pdf:{
            type:String
        }
    },
    is_admin:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)