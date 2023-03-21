const  mongoose = require("mongoose")
const { Schema } = mongoose




const CartSchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true,
        

    },
    price:{
        type:String,
        require:true,
        
        

    },
    stack:{
        type:String,
        require:true,
       
    },
    category:{
        type:String,
        require:true,
       
    },
    total:{
        type:String,
        require:true,
       
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    product:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Product"
    }
   
});



module.exports=mongoose.model("Cart",CartSchema)

