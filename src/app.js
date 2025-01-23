const express = require("express")
const connectDB = require("./config/database")
const UserModel = require("./models/user")

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

