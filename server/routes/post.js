//import
const express = require("express")
const router = express.Router()

const {create,getAllpost,getpost,remove,update,searchPost,updateIMG,getAllpostbyid} = require("../Controllers/postController")
const {requireLogin} = require("../Controllers/loginController")

//router
router.post('/post/create',requireLogin,create)
router.get('/posts/:category/:number',getAllpost)
router.get('/post/:slug',getpost)
router.get('/save/post/:_id',requireLogin,getAllpostbyid)
router.delete('/post/:slug',requireLogin,remove)
router.put('/post/:slug',requireLogin,update)
router.post('/post/searchPost',searchPost)
router.put('/post/updatimg/:slug',requireLogin,updateIMG)
//export
module.exports = router