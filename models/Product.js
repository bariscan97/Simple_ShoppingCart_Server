const  mongoose = require("mongoose")
const { Schema } = mongoose




const ProductSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
      },
   
});



module.exports=mongoose.model("Product",ProductSchema)

