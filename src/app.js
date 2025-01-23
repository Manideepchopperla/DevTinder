const express= require("express")
const app=express()
const {adminAuth,userAuth} = require("./middlewares/auth")


app.use("/admin",adminAuth)

app.get("/user",userAuth,(req,res)=>{
    console.log("User Data Fetched")
    res.send("User Data Retrieved Successfully")
})

app.get("/admin/getAllData",(req,res)=>{
    console.log("All Data Fetched")
    res.send("All Data Retrieved Successfully")
})

app.delete("/admin/deleteUser",(req,res)=>{
    console.log("User Data Deleted Successfully")
    res.send("User Data Deleted Successfully")
})


app.listen(3000,()=>{
    console.log("server running")
})