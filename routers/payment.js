const express=require("express")
const {Payment} =require("../controller/paymentController")
const {checkLimit} =require("../middlewares/checkout/checkLimit")
const {checkItems} = require("../middlewares/checkout/checkItems")
const {getAccessRoute} =require("../middlewares/authing/Auth")

const router=express.Router()

router.use([
    getAccessRoute,
    checkItems,
    checkLimit
])

router.post("/",Payment)




module.exports=router

