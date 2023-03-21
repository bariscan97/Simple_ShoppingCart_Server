const express=require("express")
const {addItem,getCard,decreaseItem}=require("../controller/cardController")
const {getAccessRoute} =require("../middlewares/authing/Auth")

const router=express.Router()

router.use(getAccessRoute)

router.get("/",getCard)
 
router.post("/:productid/add",addItem)

router.put("/:productid/decrease",decreaseItem)



module.exports=router

