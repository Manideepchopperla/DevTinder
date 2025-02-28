const validate = require('validator');

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

module.exports = {
    validateSignUpPage
}