const { catchAsyncError }  = require('../middlewares/catchAsyncError');
const { Job } = require('../models/jobModel');
const { ErrorHandler } = require('../middlewares/error');
const { token, sendToken } = require('../utils/jwtToken');


/**
/**
 * @typedef {Object} JobModel
 * @property {function} findById - Mongoose method to find a user by ID
 * @property {function} findOne - Mongoose method to find a single user
 * @property {function} find - Mongoose method to find users based on conditions
 * @property {function} findByIdAndUpdate - Mongoose method to find a user by ID and update
 * @property {function} create - Mongoose method to create a new user
 * @property {function} update - Mongoose method to update a user
 * @property {function} deleteOne - Mongoose method to delete a user
 */

/**
 * @type {JobModel}
 */


const getAllJobs = catchAsyncError(async (req, res, next ) =>{
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true, 
        jobs, 
    });
});

const postJob = catchAsyncError(async (req, res, next) =>{
    const { role } = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allow to access this resource!", 400));
    }

    const { title, description, category, country, city, location, fixSalary, salaryFrom, salaryTo} = req.body;
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Please provide full job details!", 400));
    }
    if((!salaryFrom || !salaryTo) && !fixSalary){
        return next(new ErrorHandler("Please provide fixed or range salary!", 400));
    }
    if(salaryFrom && salaryTo && fixSalary){
        return next(new ErrorHandler("Please provide fixed or range salary! ( only one )", 400));
    }

    const postedBy = req.user._id;
    const job = await Job.create({
        title, 
        description, 
        category, 
        country, 
        city, 
        location, 
        fixSalary, 
        salaryFrom, 
        salaryTo,
        postedBy,
    });

    res.status(200).json({
        success: true, 
        message: "Job posted successfully",
        job,
    });
    console.log(`${res.statusCode} : ${res.statusMessage}\nMessage : Job posted successfully\n${job} `);

});




module.exports = { getAllJobs, postJob };
