const express = require('express');
const { validateSignUpPage } = require('../utils/validation');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const { userAuth } = require('../middlewares/auth');
const authRouter = express.Router();


//Signup User
authRouter.post("/signup",async(req,res)=>{
    try{
        const {firstName, lastName, emailId,password} = req.body;
        // Validation of the data
        validateSignUpPage(req)

        // Bcrypt Password
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new UserModel({firstName, lastName, emailId,password:passwordHash})
        await user.save()
        const token = await user.getJWT()
        res.cookie("jwtToken",token,{
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 
        })
        res.send("User Signuped Successfully")
    }
    catch(err){
        res.status(401).send(`Error occured : ${err.message}`)
    }
})

//Login User
authRouter.post("/login",async(req,res)=>{
    const {emailId,password} = req.body;
    try{
        if(!emailId || !password){
            throw new Error("Please provide all details")
        }
        const user = await UserModel
        .findOne({emailId: emailId})
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isMatch = await user.validatePassword(password)
        if(!isMatch){
            throw new Error("Invalid Credentials")
        }
        const token = await user.getJWT()
        res.cookie("jwtToken",token)
        res.send("User Logged In Successfully")
    }

    catch(err){
        res.status(401).send(`Error occured : ${err.message}`)
    }
})

// Logout API 

authRouter.post("/logout",userAuth ,async(req,res)=>{
    try{
        res.clearCookie("jwtToken",{ httpOnly: true, secure: true, sameSite: "Strict" });
        res.send("User Logged Out Successfully")
    }catch(err){
        res.status(404).send("Error occured : "+err.message)
    }
})

module.exports = authRouter;