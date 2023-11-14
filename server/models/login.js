const mongoose = require("mongoose")

const loginSchema = mongoose.Schema({
    token:{
        type:String
    },
    username:{
        type:String,
        unique:true,
    },
},{timestamps:true})

module.exports = mongoose.model("Login",loginSchema)