//import
const express = require("express")
const router = express.Router()

const {create_search,get_search,get_searchtop} = require("../Controllers/searchController")
const {requireLogin} = require("../Controllers/loginController")


//router
router.post('/search',create_search)
router.get('/search/getall',get_search)
router.get('/search/gettop5',get_searchtop)



//export
module.exports = router