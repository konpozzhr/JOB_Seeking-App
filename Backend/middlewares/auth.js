const { catchAsyncError } = require('../middlewares/catchAsyncError');
const ErrorHandler = require('./error');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

/**
/**
 * @typedef {Object} UserModel
 * @property {function} findById - Mongoose method to find a user by ID
 * @property {function} findOne - Mongoose method to find a single user
 * @property {function} find - Mongoose method to find users based on conditions
 * @property {function} findByIdAndUpdate - Mongoose method to find a user by ID and update
 * @property {function} otherMethod - Other methods provided by your UserModel
 */

/**
 * @type {UserModel}
 */


const isAuthorized = catchAsyncError(async (req, res, next) =>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User not authorize", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    next();
})

module.exports = isAuthorized;