const Product=require("../models/Product")
const CustomError=require("../helpers/CustomError/CustomError")
const Cart=require("../models/Cart")



const getCard= async(req,res,next)=>{
    try{
        
        const cart=await Cart.find({user:req.user.userid})
        if (!cart){
            return next(new CustomError("card is empty",400))
        }
        return res.status(200)
        .json({
            succes:true,
            data:cart
        })
    }catch(err){
        console.log(err)
        return next(new CustomError("there is something wrong",400))
    }
}

const addItem = async(req,res,next)=>{
    try{
        
        const {productid}= req.params
        const product=await Product.findById(productid)
        if (!product){
            return next(new CustomError("no product",400))
            
        }
        const cart=await Cart.findOne({user:req.user.userid,product:productid})
        if (!cart){
            const data = await Cart.create({
                name:product.name,
                price:product.price,
                stack:1,
                category:product.category,
                total:product.price,
                user:req.user.userid,
                product:productid
            })
            return res.status(200).json({
                ok:true,
                data:data
            })
        }else{
            cart.stack=parseInt(cart.stack)+1
            if (parseInt(product.stack)<cart.stack){
                return next(new CustomError(`in stock only ${product.stack}`,400))
            }
            cart.total=parseInt(cart.stack)*parseInt(cart.price)
            const data = await cart.save()
           
            return res.status(200).json({
                ok:true,
                data:data
            })
            
        }
        
    }catch(err){
        console.log(err)
        return next(new CustomError("there is something wrong",400))
    }
}
const decreaseItem = async(req,res,next)=>{
    try{
        const {productid}= req.params

        const cart  = await Cart.findById(productid)
        if (!cart){
            return next(new CustomError("cannot be processed",404))
        }
        cart.stack=parseInt(cart.stack)-1
        if (parseInt(cart.stack)===0){
            await Cart.findByIdAndDelete(cart._id)
            return res.status(200)
            .json({
                succes:true,
                delete:true
            })
        }else{
            const data= await cart.save()
            return res.status(200)
            .json({
                succes:true,
                data:data
            })
        }

    }catch(err){
        console.log(err)
        return next(new CustomError("there is something wrong",400))
    }
}

module.exports={
    addItem,
    getCard,
    decreaseItem
}
