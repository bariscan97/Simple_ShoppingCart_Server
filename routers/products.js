const express=require("express")
const {getproducts}=require("../controller/productsController")

const router=express.Router()

router.get("/",getproducts)

module.exports=router