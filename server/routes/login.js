//import
const express = require("express")
const router = express.Router()

const {create,get_token,get_username,getall,login,logout,requireLogin} = require("../Controllers/loginController")



//router
router.post('/login',login)
router.post('/login/create',create)
router.get('/login/getall',getall)
router.get('/login/gettoken',get_token)
router.get('/login/getusername',get_username)
router.post('/logout/:username',logout)


//export
module.exports = router