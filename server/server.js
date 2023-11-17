//import
const express = require("express")
const mongoose = require("mongoose");
const morgan = require("morgan")
const cors = require("cors")

//import route
const userRoute = require("./routes/user")
const postRoute = require("./routes/post")
const loginRoute = require("./routes/login")

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

//route
app.use('/api',userRoute)
app.use('/api',postRoute)
app.use('/api',loginRoute)


const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`Start serer in port ${port}`))