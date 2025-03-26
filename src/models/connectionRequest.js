const mongoose = require("mongoose")

const ConnectionSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
    },
    status : {
        type : String,
        required : true,
        enum: {
            values : ["ignore", "interested", "accepted", "rejected"],
            message : "{VALUE} is a Invalid Status" 
        }
    }
},
{
    timestamps : true
})

//Compound Index

ConnectionSchema.index({fromUserId: 1,toUserId: 1})
ConnectionSchema.pre("save", function(next){
    // Check If FromUserId and ToUserId are Equal or Not.
    const connectionDetails = this 
    if(connectionDetails.fromUserId.equals(connectionDetails.toUserId)){
        throw new Error("Can't send Connectttion to Youself!");
    } 
    next();
})

const ConnectionRequest = mongoose.model("connectionRequest", ConnectionSchema)

module.exports = {
    ConnectionRequest
}