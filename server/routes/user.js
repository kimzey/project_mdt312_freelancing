//import
const express = require("express")
const router = express.Router()

const {create,getAlluser,getuser,remove,update,searchUser,updateIMG,updatePDF} = require("../Controllers/userController")
const {requireLogin} = require("../Controllers/loginController")
// ,getuser,remove,update

//router
router.post('/user/create',create)
router.get('/users',getAlluser)
router.get('/user/:username',getuser)
router.delete('/user/:username',requireLogin,remove)
router.put('/user/:username',requireLogin,update)
router.post('/searchUser',searchUser)
router.put('/user/updatimg/:username',requireLogin,updateIMG)
router.put('/user/updatpdf/:username',requireLogin,updatePDF)

//export
module.exports = router