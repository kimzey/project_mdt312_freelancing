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
        }
    },
    is_admin:{
        type:String
    },
    name_img:{
        type:String,
        unique:true
    },
    name_pdf:{
        type:String
    }
},{timestamps:true})


// const userdetail = mongoose.Schema({
//     id:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     ability:{
//         type:String
//     },
//     education:{
//         type:String
//     },
//     Workh_istory:{
//         type:String
//     },
//     link_html:{
//         type:String
//     }
// },{timestamps:true})

// module.exports = mongoose.model("Userdetail",userdetail)

module.exports = mongoose.model("User",userSchema)