const mongoose=require("mongoose")

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://Manideep:Ym5tBwOwkFfN6iPh@namastenode.ygfff.mongodb.net/devTinder"
        // "mongodb://localhost:27017/devTinder"
    );
}

module.exports=connectDB

