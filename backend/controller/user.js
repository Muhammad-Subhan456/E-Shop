const express = require("express");
const path = require("path");
const router = express.Router();
const {upload} = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs")
const jwt = require("jsonwebtoken")

router.post("/create-user",upload.single("file"), async (req,res,next)=>{
    const {name,email,password} = req.body;
    const userEmail = await User.findOne({email});
    if(userEmail){
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err)=>{
            if(err){
                console.log(err);
                res.status(500).json({
                    message: "Error Deleting File"
                })
            }
            else{
                res.json({message: "File Deleted Successfully" });
            }
        } )
        return next(ErrorHandler("User already exists",400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    
    const user = {
        name: name,
        email: email,
        password: password,
        avatar : fileUrl,
    };
    
    const activationToken = createActivationToken(user);

})

const createActivationToken = (user) =>{
    return jwt.sign(user,process.env.ACTIVATION_SECRET,{
        expiresIn: "5m",
    });
}
 
module.exports = router;