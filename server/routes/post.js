//import
const express = require("express")
const router = express.Router()

const {create,getAllpost,getpost,remove,update,searchPost,updateIMG} = require("../Controllers/postController")


//router
router.post('/post/create',create)
router.get('/posts/:category/:number',getAllpost)
router.get('/post/:slug',getpost)
router.delete('/post/:slug',remove)
router.put('/post/:slug',update)
router.post('/post/searchPost',searchPost)
router.put('/post/updatimg/:slug',updateIMG)

//export
module.exports = router