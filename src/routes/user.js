const express = require('express');
const { userAuth } = require('../middlewares/auth');
const {ConnectionRequest} = require('../models/connectionRequest');
const UserModel = require('../models/user');

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl skills gender age about";

// Get all pending Connection requests for the logged-in user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUserId = req.user._id
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested"
        }).populate("fromUserId","firstName lastName photoUrl skills gender age about");

        res.status(200).json({message:"Requests Recieved Data Fetched Successfully",data: connectionRequests})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user
        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId toUserId",USER_SAFE_DATA);

        const data = connections.map(connection => {
            if(connection.fromUserId.equals(loggedInUser._id)){
                return connection.toUserId;
            }
            return connection.fromUserId;
        })

        res.status(200).json({message:"Connections Data Fetched Successfully",data})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const pages = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (pages-1)*limit;

        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        })

        const hideUserFromFeed = new Set();
        connections.forEach(connection => hideUserFromFeed.add(connection.fromUserId.toString()).add(connection.toUserId.toString()));

        const feedData = await UserModel.find({
            $and: [
                // _id:{$nin: Array.from(hideUserFromFeed)},
                {_id:{$nin: [...hideUserFromFeed]}},
                {_id: {$ne: loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);


        res.status(200).json({message: "Feed Generated Successfully",data: feedData}) 
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


module.exports = userRouter;