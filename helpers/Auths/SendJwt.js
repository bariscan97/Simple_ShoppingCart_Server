const jwt  =  require("jsonwebtoken")

const SendJwt = (user,req,res)=>{
    
    
    token=user.generateJwtFromUser()
    
    res
    .status(200)
    .cookie("access",token,{
        httpOnly:true,
        expires: new Date(Date.now()+10000000),
        secure: process.env.NODE_ENV === "development" ? false : true
    })
    .json({
        success:true,
        access:token,
        data:{
            id:user.id,
            name:user.name,
            email:user.email
            
        }
    })

}
// const generateJwtFromUser=(req)=>{
//     const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env
//     const payload ={
//         name:req.body.name,
//         email : req.body.email
//     }
//     const token = jwt.sign(payload,JWT_SECRET_KEY,{
//         expiresIn :JWT_EXPIRE
//     })
//     return token
// }


module.exports={
    SendJwt,
    
}