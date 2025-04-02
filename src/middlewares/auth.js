const jwt=require('jsonwebtoken')
const UserModel = require('../models/user');

const userAuth= async (req,res,next)=>{
    const {jwtToken} = req.cookies;
    try{
        if(!jwtToken){
            return res.status(401).json({message: "Please Login!!"  })
        }
        const decodeMsg = await jwt.verify(jwtToken,"Manideep@DevTinder$1820")
        const id = decodeMsg.id
        const user = await UserModel.findById(id)
        if(!user){
            throw new Error("invalid User")
        }
        req.user = user
        next()
    }
    catch(err){
        res.status(400).send(`Error occured : ${err.message}`)
    }

}

module.exports={
    userAuth,
}