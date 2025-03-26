const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength: 4,
        maxLength: 50,
        index: true
    },
    lastName: {
        type: String,
        required:true,
        minLength: 4,
        maxLength: 50,
        index: true
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

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({id: user.id},"Manideep@DevTinder$1820",{expiresIn: "1d"})
    return token
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    return await bcrypt.compare(passwordInputByUser,user.password)
}

const UserModel = mongoose.model("User",userSchema)

module.exports=UserModel