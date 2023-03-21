const Product=require("../models/Product")
const CustomError=require("../helpers/CustomError/CustomError")
const Cart=require("../models/Cart")




const Payment = async(req,res,next)=>{
    try{
        const cart=await Cart.find({user:req.user.userid})
        for (let i =0 ;i<cart.length;i++){
            let product = await Product.findOne({_id:cart[i].product})
            product.stack=parseInt(product.stack)-parseInt(cart[i].stack)
            if (parseInt(product.stack)===0){
                await Product.findByIdAndDelete(cart[i].product)
            }else{
                await product.save()
            }
        }
        await Cart.deleteMany({
            user:req.user.userid
        })
        return res 
        .status(200)
        .json({
            payment:"successful"
        })
    }catch(err){
        console.log(err)
        return next(new CustomError("there is something wrong",400))
    }
}






module.exports={
    Payment
}