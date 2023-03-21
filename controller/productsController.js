const Product=require("../models/Product")
const CustomError=require("../helpers/CustomError/CustomError")
const Cart=require("../models/Cart")



const getproducts = async (req,res,next)=>{
    try{    
        const {category}=req.query
        if (category){
            const products = await Product.find({category:category})
            return res.status(200)
            .json({
                succes:true,
                data:products
            })
        }
        const products= await Product.find()    
        return res.status(200)
        .json({
            succes:true,
            data:products
        })
        
        
          
    
    }catch(err){
        console.log(err)
        return next(new CustomError("there is something wrong",400))
    }

}

module.exports={
    getproducts
}




