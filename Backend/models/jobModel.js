const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "Please provide job title"],
        minLength: [2, "Job title must be contain at least 2 charater."],
        maxLength: [50, "Job title cannot exceed 50 character"],
    },
    description: {
        type: String, 
        required: [true, "Please provide a job description"],
        minLength: [2, "Job description must be contain at least 2 character. "],
        maxLength: [50, "Job description cannot exceed 50 character. "], 
    },
    category: {
        type: String, 
        required: [true, "Job category is required."], 
    }, 
    country: {
        type: String, 
        required: [true, "Job country is required"],
    }, 
    city: {
        type: String, 
        required: [true, "Job city is required."], 
    },
    location: {
        type: String,
        required: [true, "Please provide exact location "], 
        minLength: [5, "Location must be contain at least 5 character. "], 
        maxLength: [50, "Location cannot exceed 50 character"],
    }, 
    fixSalary: {
        type: Number, 
        minLength: [4], 
        maxLength: [20],
    },
    salaryFrom:{
        type: Number, 
        minLength: [4], 
        maxLength: [20],
    },
    salaryTo: {
        type: Number, 
        minLength: [4], 
        maxLength: [20],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,   
        default: Date.now(),
    },
    postedBy: {
        type: mongoose.Schema.ObjectId, 
        ref: "User", 
        required: true, 
    }


});


const Job = mongoose.model('Jobs', jobSchema);
module.exports = { Job } ; 