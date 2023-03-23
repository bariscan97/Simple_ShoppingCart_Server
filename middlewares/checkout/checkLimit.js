const CustomError = require("../../helpers/CustomError/CustomError")
const Cart=require("../../models/Cart")




const checkLimit = async(req,res,next)=>{
    try{
        const cart=await Cart.find({user:req.user.userid})
        let total=0
        for (let i =0 ;i<cart.length;i++){
            total+=parseInt(cart[i].total)
        }
        if (Number(total)<100){
            let diff = 100-Number(total)
            return next(new CustomError(`The minimum limit is $100. Add $${diff} items to your cart.`,400))
           }
        next()
       
    
        
    }catch(err){
        console.log(err)
        return next(new CustomError("there is something wrong",400))
    }
}

module.exports={
    checkLimit
}