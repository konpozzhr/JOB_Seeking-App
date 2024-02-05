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


const getmyJobs = catchAsyncError(async (req, res, next) =>{
    const { role } = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allow to access this resource!", 400));
    }

    const myjobs = await Job.find( {postedBy: req.user._id} );
    res.status(200).json({
        success: true, 
        myjobs,
    });
    console.log(`${res.statusCode} : ${res.statusMessage}\nMessage : Job posted successfully\n${myjobs} `);
});

// Update Job 
const updateJob = catchAsyncError(async (req, res, next ) =>{
    const { role }  = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allow to access this resource!", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Oops, Job not found!", 400));
    }
    jobUpdated = await Job.findByIdAndUpdate(id, req.body, {
        new: true, 
        runValidators: true, 
        useFindAndModified: false,
    });

    res.status(200).json({
        success: true, 
        jobUpdated, 
        message: "Job update successfully",
    });
    console.log(`${res.statusCode} : ${res.statusMessage}\nMessage : Job update successfully\n${jobUpdated} `);
});


const deleteJob = catchAsyncError(async (req, res, next) =>{
    const { role } = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allow to access this resource!", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Oops, Job not found!", 400));
    }
    const jobDel = await job.deleteOne();
    res.status(200).json({
        success: true, 
        jobDel, 
        message: "Job delete successfully",
    });
    console.log(`${res.statusCode} : ${res.statusMessage}\nMessage : Job update successfully\n${jobDel} `);
})






module.exports = { getAllJobs, postJob, getmyJobs, updateJob, deleteJob };
