const express = require("express")
const profileRouter = express.Router()
const { userAuth } = require("../middlewares/auth")
const {validateEditProfileData,validateCurrentPassword} = require("../utils/validation")
const bcrypt = require("bcryptjs")

//GET USER Profile
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user = req.user
        res.send(user)
    }catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

//UPDATE (or) EDIT USER Profile

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Please Provide Valid Data To Edit")
        }
        const user = req.user
        Object.keys(req.body).forEach((each)=>user[each]=req.body[each])
        await user.save()
        res.status(200).json({message: "Profile Updated Successfully",data: user})
    }catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

//Edit Password

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        validateCurrentPassword(req)
        const user = req.user
        const passwordHash = await bcrypt.hash(req.body.newPassword,10);
        user.password = passwordHash
        await user.save()
        res.send("Password Updated Successfully")

    }catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

module.exports = profileRouter;