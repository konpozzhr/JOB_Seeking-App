const { catchAsyncError }  = require('../middlewares/catchAsyncError');
// const ErrorHandler = require('../middlewares/error');
const { User } = require('../models/userModel');
const { ErrorHandler } = require('../middlewares/error');



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
    res.status(200).json({
        success: true, 
        message: "User registerd success",
        user,
    });
});


module.exports = { register };
// module.exports = register ;