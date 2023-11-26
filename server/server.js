//import
const express = require("express")
const mongoose = require("mongoose");
const morgan = require("morgan")
const cors = require("cors")
// const fileUpload = require('express-fileupload');

//import route
const userRoute = require("./routes/user")
const postRoute = require("./routes/post")
const loginRoute = require("./routes/login")
const searchRoute = require("./routes/search")
const favouriteRoute = require("./routes/favourite")
//setup
require("dotenv").config()
const app = express()

//connent database
mongoose.connect(process.env.DATABASE)
.then(()=>console.log("connect database compls!"))
.catch((err)=>console.log(err))

//middlwware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.static('public'))
// app.use(fileUpload());

//route
app.use('/api',userRoute)
app.use('/api',postRoute)
app.use('/api',loginRoute)
app.use('/api',searchRoute)
app.use('/api',favouriteRoute)


const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`Start serer in port ${port} `))