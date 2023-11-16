//import
const express = require("express")
const router = express.Router()

const {create,getAlluser,getuser,remove,update,searchUser,updateIMG,updatePDF} = require("../Controllers/userController")
// ,getuser,remove,update

//router
router.post('/create',create)
router.get('/users',getAlluser)
router.get('/user/:username',getuser)
router.delete('/user/:username',remove)
router.put('/user/:username',update)
router.post('/searchUser',searchUser)
router.put('/updatimg/:username',updateIMG)
router.put('/updatpdf/:username',updatePDF)

//export
module.exports = router