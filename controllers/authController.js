const asyncHandler = require('express-async-handler');
const userModel = require('../models/Users/user');
const bcrypt = require('bcryptjs');


const {generateAccessToken,verifyToken} = require('../utils/generateToken')


const registerUserController = asyncHandler(async (req,res) => {

    const {full_name,email,password,user_type}=req.body;
    // check email unique
    const doesEmailExist = await userModel.findOne({email});
    if (doesEmailExist){
        throw new Error("Email Already exists");
    }
    
    const newUser = await userModel.create({
        full_name,email,password,user_type
    });

    // create token for this user
    const accessToken = generateAccessToken(newUser._id)

    res.status(201).json({
        status:"success",
        token:accessToken,
        data:newUser
    });
    }
);


const loginUserController = asyncHandler(async (req,res) => {

    const {email,password}=req.body;
    if(!email || !password){
        throw new Error("Please provide Email address and password for login!!")
    }
    const user = await userModel.findOne({email}).select('+password');
    if (!user) {
        throw new Error("Invalid Email Address");
      }
    
     // Compare hashed password
     const passwordMatch = await bcrypt.compare(password, user.password);

     if (!passwordMatch) {
       throw new Error("Invalid Password");

     }

         // create token for this user
    const accessToken = generateAccessToken(user._id)
    

    res.status(200).json({
        status:"success",
        token:accessToken,
    });
    }
);

// protected routes

const userDashboardController = asyncHandler(async (req,res) => {

    console.log("User Dashboard=========>")
    

    res.status(200).json({
        status:"success",
        message:"Welcome to Dashboard",
    });
    }
);
 


module.exports = {
    registerUserController,
    loginUserController,
    userDashboardController
};

