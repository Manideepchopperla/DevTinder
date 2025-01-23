const adminAuth=(req,res,next)=>{
    const token="xyz"
    const isAdminAuthorized=token==="xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Admin")
    }
    else{
        next()
    }
}

const userAuth=(req,res,next)=>{
    const token="xyz"
    const isAdminAuthorized=token==="xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized User")
    }
    else{
        next()
    }
}

module.exports={
    adminAuth,
    userAuth
}