const mongoose = require("mongoose")

const searchSchema = mongoose.Schema({
    category:{
        type:String
    },
    username:{
        type:String,
    }
},{timestamps:true})

module.exports = mongoose.model("Search",searchSchema)