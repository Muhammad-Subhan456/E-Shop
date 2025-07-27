const express = require("express");
const path = require("path");
const router = express.Router();
const {upload} = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const fs = require("fs")
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const user = require("../model/user");
const sendToken = require("../utils/jwtToken")

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
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
        await sendMail({
            email : user.email,
            subject : "Activate your account",
            message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`
        })
        res.status(201).json({
            success: true,
            message: `please check your email :- ${user.email} to activate your account`
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,500))
    }

})

const createActivationToken = (user) =>{
    return jwt.sign(user,process.env.ACTIVATION_SECRET,{
        expiresIn: "5m",
    });
}
 
// activate user

router.post("/activation",catchAsyncErrors(async(req,res,next)=>{
    try {
        const {activationToken} = req.body;
        const newUser = jwt.verify(activation_token,process.env.ACTIVATION_SECRET);
        if(!newUser){
            return next(new ErrorHandler("Invalid Token",400));
        }
        const {name,email,password,avatar} = newUser;
        User.create({
            name,
            email,
            avatar,
            password,
        });
        sendToken(newUser,201,res);

    } catch (error) {
        
    }
}))

module.exports = router;