const validate = require('validator');
const bcrypt = require('bcryptjs');


//Validate SignUp Page

const validateSignUpPage = (req)=>{
    const {firstName, lastName, emailId,password} = req.body;
    if(!firstName || !lastName || !emailId || !password){
        throw new Error("Please provide all details")
    }
    if(!firstName || !lastName){
        throw new Error("Please provide first name and last name")
    }
    if(!validate.isEmail(emailId)){
        throw new Error("Please provide valid email")
    }
    if(!validate.isLength(password,{min:8})){
        throw new Error("Please provide valid password")
    }
    if(!validate.isStrongPassword(password)){
        throw new Error("Please provide strong password")
    }
}

//Validate Edit Profile Data

const validateEditProfileData = (req)=>{
    const ALLOWED_FIELDS=["firstName","lastName","age","gender","skills","photoUrl","about"]
    const fields=Object.keys(req.body).every((field)=>ALLOWED_FIELDS.includes(field))
    return fields
}

//Validate Current Password

const validateCurrentPassword = async(req) => {
    const ALLOWED_FIELDS=["currentPassword","newPassword","confirmPassword"]
    const fields=Object.keys(req.body).every((field)=>ALLOWED_FIELDS.includes(field))
    if(!fields){
        throw new Error("Please provide valid data")
    }
    const user = req.user
    const validatePass = await bcrypt.compare(req.body.currentPassword,user.password)
    if(!validatePass){
        throw new Error("Please provide valid password")
    }
    if(!validate.isStrongPassword(req.body.newPassword)){
        throw new Error("Please provide strong password")
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        throw new Error("Password and Confirm Password should be same")
    }

}

module.exports = {
    validateSignUpPage,
    validateEditProfileData,
    validateCurrentPassword
}