//import
const express = require("express")
const router = express.Router()

const {create,get_token,get_username,getall} = require("../Controllers/loginController")


//router
router.post('/login/create',create)
router.get('/login/getall',getall)
router.get('/login/gettoken',get_token)
router.get('/login/getusername',get_username)


//export
module.exports = router