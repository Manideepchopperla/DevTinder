const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required:true,
        minLength: 4,
        maxLength: 50,

    },
    emailId: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
        // match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required:true,
        minLength: 8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not valid")
        }
        // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }},
    age: {
        type: Number,
        min: 18,
        
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others","Male","Female"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.geographyandyou.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("URL is not valid"+value)
            }
        }
    },
    about: {
        type: String,
        default: "This is a default About of the User" 
    },
    skills: {
        type:[String],
        validate(value){
            if(value.length>10 ){
                throw new Error("Skills Cant be more than 10")
            }
        }
    },
    
},{
    timestamps: true
})

const UserModel = mongoose.model("User",userSchema)

module.exports=UserModel