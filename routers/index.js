const express= require("express")
const auth=require("./auth")
const cart =require("./cart")
const user=require("./user")
const payment =require("./payment")
const products=require("./products")

const router= express.Router()

router.use("/auth",auth)
router.use("/cart",cart)
router.use("/profile",user)
router.use("/payment",payment)
router.use("/products",products)

module.exports=router