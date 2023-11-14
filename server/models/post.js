const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    tag:{
        type:String,
        lowercase:true
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true,
    },
    img_post:{
        type:String,
        unique:true
    }
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)