//import
const express = require("express")
const router = express.Router()

const {create,getAlluser} = require("../Controllers/userController")


//router
router.post('/create',create)
router.get('/users',getAlluser)

//export
module.exports = router