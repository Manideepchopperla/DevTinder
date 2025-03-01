const express = require("express")
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")


const app = express()
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const requestRouter = require("./routes/request")
const profileRouter = require("./routes/profile")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/",requestRouter)


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




















//     //GET USER BY EMAIL
// app.get("/user",userAuth,async(req,res)=>{
//     const email = req.body.emailId;
//     try{
//         const obj = await UserModel.findOne({emailId: email})
//         if(obj.length===0){
//             res.status(404).send("User Not Found")
//         }else{
//             res.send(obj)
//         }
//     }catch(err){
//         res.status(400).send("Unable to Retieve Data")
//     }
// })


// //Update User By Email
// app.patch("/user/:emailId",userAuth,async(req,res)=>{
//     const {emailId}=req.params
//     const data=req.body
//     try{
//         const users = await UserModel.findOneAndUpdate
//         ({emailId: emailId},data,{
//             returnDocument:"after",
//             runValidators: true
//         });
//         res.send("User Data Updated Successfully")
//     }
//     catch(err){
//         res.status(404).send("Update Failed : "+err.message)
//     }
// })

// //UPDATE USER BY ID


// app.patch("/user",userAuth,async(req,res)=>{
//     const id=req.body.id
//     const data=req.body
    
//     try{
//         const ALLOWED_FIELDS=["id","firstName","lastName","gender","password","age","skills","photoUrl"]
//         const fields=Object.keys(data).every((field)=>ALLOWED_FIELDS.includes(field))
//         if(!fields){
//             throw new Error("Invalid Fields.Update Not allowed")
//         }
//         if(data?.skills.length>10){
//             throw new Error("Skills Cant be more than 10")
//         }

//         const users = await UserModel.findByIdAndUpdate({_id: id},data,{
//             returnDocument:"after",
//             runValidators: true
//         });
        
//         res.send("User Data Updated Successfully")
//     }
//     catch(err){
//         res.status(404).send("Update Failed : "+err.message)
//     }
// })

// //Delete USER BY ID

// app.delete("/user",userAuth,async(req,res)=>{
//     const id=req.body.userId
//     try{
//         const users=await UserModel.findByIdAndDelete({ _id : id });
//         // const users=await UserModel.findByIdAndDelete(id)
//         res.send("User Deleted Successfully")
//     }
//     catch(err){
//         res.status(404).send("Unable to delete User")
//     }
// })



// //FEED API - GET / feed - get all the users from the database
// app.get("/feed",userAuth ,async(req,res)=>{
//     try{
//         const users = await UserModel.find({})
//         res.send(users)
//     }catch(err){
//         res.status(400).send("Unable to Retieve Data")
//     }
// })
