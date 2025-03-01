const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require('../middlewares/auth')

//Send Connection Request
requestRouter.post("/sendConnection",userAuth,async(req,res)=>{
    try{
        const user = req.user
        const {firstName} = user
        console.log(firstName+" has sent the Connection Request")
        res.send("Connection Request Sent Successfully")
    }catch(err){
        res.status(400).send("Error: "+err.message)
    }

})

module.exports = requestRouter