const { catchAsyncError }  = require('../middlewares/catchAsyncError');
// const ErrorHandler = require('../middlewares/error');
const { User } = require('../models/userModel');
const { ErrorHandler } = require('../middlewares/error');
const { token, sendToken } = require('../utils/jwtToken');
// const { default: isEmail } = require('validator/lib/isemail');



/**
/**
 * @typedef {Object} UserModel
 * @property {function} findById - Mongoose method to find a user by ID
 * @property {function} findOne - Mongoose method to find a single user
 * @property {function} find - Mongoose method to find users based on conditions
 * @property {function} findByIdAndUpdate - Mongoose method to find a user by ID and update
 * @property {function} create - Mongoose method to create a new user
 * @property {function} update - Mongoose method to update a user
 * @property {function} deleteOne - Mongoose method to delete a user
 */

/**
 * @type {UserModel}
 */

const register = catchAsyncError(async (req, res, next) =>{
    
    const {name, email, phone, role, password } = req.body;
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill registration form"));
    }

    const isEmail = await User.findOne({ email });
    if(isEmail){
        return next(new ErrorHandler("Email already exists!"));
    }
    const user = await User.create({
        name, 
        email, 
        phone, 
        role, 
        password, 

    });
    
    // res.status(200).json({
    //     success: true, 
    //     message: "User registerd success",
    //     user,
    // });
    // console.log(`${res.statusCode} : ${res.statusMessage}\nMessage : User registered success\n${user} `);

    sendToken(user, 200, res, "User register success");
});


const login = catchAsyncError(async (req, res, next) =>{
    const {email, password, role} = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide email, password and role", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 400)); 
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    
    if(user.role !==  role){
        return next(new ErrorHandler(`User with provide email and role: [${role}] is not found!`, 400)); 
    }

    sendToken(user, 200, res, "User Logged in successful");
});

const logout = catchAsyncError(async (req, res, next) =>{
    res
        .status(201)
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true, 
            message: "User logged out",
        });

    console.log('User logged out');
        
});

const getUser = catchAsyncError( async (req, res, next) =>{
    const user = req.user;
    res.status(200).json({
        success: true, 
        message: "Current user",
        user,
    });
});



module.exports = { register, login, logout, getUser };
// module.exports = register ;