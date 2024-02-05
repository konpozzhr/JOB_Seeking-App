const { catchAsyncError }  = require('../middlewares/catchAsyncError');
const { Application } = require('../models/applicationModel');
const { ErrorHandler } = require('../middlewares/error');
const { token, sendToken } = require('../utils/jwtToken');
const cloudinary = require('cloudinary');
const { Job } = require('../models/jobModel')


/**
/**
 * @typedef {Object} ApplicationModel
 * @property {function} findById - Mongoose method to find a user by ID
 * @property {function} findOne - Mongoose method to find a single user
 * @property {function} find - Mongoose method to find users based on conditions
 * @property {function} findByIdAndUpdate - Mongoose method to find a user by ID and update
 * @property {function} create - Mongoose method to create a new user
 * @property {function} update - Mongoose method to update a user
 * @property {function} deleteOne - Mongoose method to delete a user
 */

/**
 * @type {ApplicationModel}
 */



const empGetAllApplication = catchAsyncError( async (req, res, next) =>{
    const { role } = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job seeker is not allow to access this resource!", 400));
    }

    const { _id } = req.user;
    const applications = await Application.find({'employerID.user': _id});
    res.status(200).json({
        success: true, 
        applications,
    });
    console.log(`${res.statusCode} : ${res.statusMessage}\n${applications} `);
});

const jobSeekerApplication = catchAsyncError( async (req, res, next) =>{
    const { role } = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not allow to access this resource!", 400));
    }

    const { _id } = req.user;
    const applications = await Application.find({'employerID.user': _id});
    res.status(200).json({
        success: true, 
        applications,
    });
    console.log(`${res.statusCode} : ${res.statusMessage}\n${applications} `);
    
});

const jobSeekerDeleteApplication = catchAsyncError( async (req, res, next) =>{
    const { role } = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not allow to access this resource!", 400));
    }
    const { id } = req.params;
    const applications = await Application.findById(id);
    if(!applications){
        return next(new ErrorHandler("Oops, Application not found!", 400));
    }

    const applicationDeleted = await applications.deleteOne();
    res.status(200).json({
        success: true, 
        applicationDeleted,
    });
    console.log(`${res.statusCode} : ${res.statusMessage}\n${applicationDeleted} `);    
    
});


const postApplication = catchAsyncError( async (req, res, next) =>{
    const { role } = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not allow to access this resource!", 400));
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Resume is required!"));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/webp"];
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("File type is not correct, please upload file with extension .jpg .png .webp", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("cloudinary error: ", cloudinaryResponse.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Failed to upload resume.", 500));
    }
    
    const { name, email, coverLetter, phone, address, jobId} = req.body;
    const applicationID = {
        user: req.user._id,
        role: "Job Seeker",

    };
    if(!jobId){
        return next(new ErrorHandler("Job not found", 404));
    }
    
    const jobDetails = await Job.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler("Job not found", 404));
    }

    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    };
    if(!name || !email || !phone || !coverLetter || !address || !applicationID || !employerID || !resume){
        return next(new ErrorHandler("Please fill all field", 400));
    }

    const application = await Application.create({
        name, 
        email, 
        coverLetter, 
        phone, 
        address, 
        applicationID, 
        employerID, 
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,            
        },

    });
    
    res.status(200).json({
        success: true, 
        message: "Application Submit success",
        application,
    });
    console.log(`${res.statusCode} : ${res.statusMessage}\nApplication submit success\n${application} `);    

});


module.exports = { empGetAllApplication, jobSeekerApplication, jobSeekerDeleteApplication , postApplication};