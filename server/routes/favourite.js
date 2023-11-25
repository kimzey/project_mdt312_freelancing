//import
const express = require("express")
const router = express.Router()

const {create_favourite,get_favourite,get_favouriteall,remove_save} = require("../Controllers/favouriteController")


//router
router.post('/favourite',create_favourite)
router.get('/favourite/getall',get_favouriteall)
router.get('/favourite/get/:username',get_favourite)
router.delete('/favourite/delete/:_id',remove_save)



//export
module.exports = router