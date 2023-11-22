const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    category:{
        type:String,
        lowercase:true
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true,
    },
    img_post:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)