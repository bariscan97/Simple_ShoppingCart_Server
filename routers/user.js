const express=require("express")
const {userGet,changePassword,deleteUser}=require("../controller/userController")
const {getAccessRoute} =require("../middlewares/authing/Auth")



const router=express.Router()



router.put("/changePassword",getAccessRoute,changePassword)

router.put("/deleteMe",getAccessRoute,deleteUser)

router.get("/",getAccessRoute,userGet)


module.exports=router

