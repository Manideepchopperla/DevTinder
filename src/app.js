const express = require("express")
const connectDB = require("./config/database")
const UserModel = require("./models/user")
const { ReturnDocument } = require("mongodb")

const app = express()
app.use(express.json())

app.post("/signup",async(req,res)=>{

    // const {firstName,lastName,emailId,password,age,gender}=req.body
    // const userObj={
    //     firstName,
    //     lastName,
    //     emailId,
    //     password,
    //     age,
    //     gender
    // }

    const user = new UserModel(req.body)
    try{
        user.save()
        res.send("User Signuped Successfully")
    }
    catch(err){
        res.status(400).send("Error occured ",err.message)
    }
})

//GET USER BY EMAIL
app.get("/user",async(req,res)=>{
    const email = req.body.emailId;
    try{
        const obj = await UserModel.findOne({emailId: email})
        if(obj.length===0){
            res.status(404).send("User Not Found")
        }else{
            res.send(obj)
        }
    }catch(err){
        res.status(400).send("Unable to Retieve Data")
    }
})

//UPDATE USER BY ID


app.patch("/user",async(req,res)=>{
    const id=req.body.userId
    const data=req.body
    console.log(data)
    try{
        const users = await UserModel.findByIdAndUpdate({_id: id},data,{
            returnDocument:"after",
            runValidators: true
        });
        console.log(users)
        res.send("User Data Updated Successfully")
    }
    catch(err){
        res.status(404).send("Update Failed : "+err.message)
    }
})

//Delete USER BY ID

app.delete("/user",async(req,res)=>{
    const id=req.body.userId
    try{
        const users=await UserModel.findByIdAndDelete({ _id : id });
        // const users=await UserModel.findByIdAndDelete(id)
        res.send("User Deleted Successfully")
    }
    catch(err){
        res.status(404).send("Unable to delete User")
    }
})

//FEED API - GET / feed - get all the users from the database
app.get("/feed", async(req,res)=>{
    try{
        const users = await UserModel.find({})
        res.send(users)
    }catch(err){
        res.status(400).send("Unable to Retieve Data")
    }
})

connectDB()
    .then(()=>{
        console.log("Database Connection Established Successfully")
        app.listen(3000,()=>{
            console.log("server running at port 3000 ")
        })
    })
    .catch(()=>{
        console.log("Database Connection doesn't Established")
    })

