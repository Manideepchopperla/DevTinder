const express = require("express")
const profileRouter = express.Router()
const { userAuth } = require("../middlewares/auth")

//GET USER Profile
profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user
        res.send(user)
    }catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

module.exports = profileRouter;