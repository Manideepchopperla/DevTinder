const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require('../middlewares/auth')
const UserModel = require('../models/user')
const { ConnectionRequest } = require('../models/connectionRequest')
const { default: mongoose } = require('mongoose')

//Send Connection Request
requestRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.userId
        const status = req.params.status

        const ALLOWED_STATUS = ["ignore", "interested"]
        const isValidStatus = ALLOWED_STATUS.includes(status)

        if(!isValidStatus){
            return res.status(400).json({message:"Invalid Status Type"+status})
        }

        const validToUser = await UserModel.findById(new mongoose.Types.ObjectId(toUserId));
       
       if(!validToUser){
            throw new Error("invalid User")
        }

       // If there is an existing ConnectionRequest
       const existingRequest = await ConnectionRequest.findOne({
        $or : [
            {
                fromUserId,
                toUserId
            },
            {
                fromUserId : toUserId,
                toUserId : fromUserId
            }
        ]
        
       })

       if(existingRequest){
          throw new Error ("Connection Request Already Exists")
       }
       

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        await connectionRequest.save()
        
        res.json({message:fromUserId+" has sent the Connection Request to "+toUserId})
    }catch(err){
        res.status(400).json({message:"Error: "+err.message})
    }

})


// 

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        // Validate the status
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid Status Type");
        }


        // Find the connection request
        const connectionDetails = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        });

        if (!connectionDetails) throw new Error("Connection Request Not Found");

        // Update the status and save the connection
        connectionDetails.status = status;
        await connectionDetails.save();

        // Send a response after successful save
        res.status(200).json({ message: "Request Accepted Successfully" });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = requestRouter