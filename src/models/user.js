const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,

    },
    emailId: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required:true,
        minLength: 8,
        maxLength: 15
    },
    age: {
        type: Number,
        min: 18,
        
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.geographyandyou.com/images/user-profile.png",
    },
    about: {
        type: String,
        default: "This is a default About of the User" 
    },
    skills: {
        type:[String]
    },
    
},{
    timestamps: true
})

const UserModel = mongoose.model("User",userSchema)

module.exports=UserModel