const Product=require("../../models/Product")
const CustomError=require("../../helpers/CustomError/CustomError")
const Cart=require("../../models/Cart")




const checkItems = async(req,res,next)=>{
    try{
        const cart=await Cart.find({user:req.user.userid})
        for (let i =0 ;i<cart.length;i++){
            let product = await Product.findOne({id:cart[i].product})
            product.stack=parseInt(product.stack)-parseInt(cart[i].stack)
            if (parseInt(product.stack)<parseInt(cart[i].stack)){
               return next(new CustomError("some items are out of stock check your cart"))
            }
        }
        next()
       
    
        
    }catch(err){
        console.log(err)
        return next(new CustomError("there is something wrong",400))
    }
}

module.exports={
    checkItems
}