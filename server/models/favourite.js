const mongoose = require("mongoose")

const favouriteSchema = mongoose.Schema({
    category:{
        type:String
    },
    username:{
        type:String,
    },
    id_post:{
        type:String,
    }
},{timestamps:true})

module.exports = mongoose.model("Favourite",favouriteSchema)