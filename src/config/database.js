const mongoose=require("mongoose")

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://Manideep:Ym5tBwOwkFfN6iPh@namastenode.ygfff.mongodb.net/devTinder"
    );
}

module.exports=connectDB

