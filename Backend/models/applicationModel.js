const mongoose = require('mongoose');
const validator = require('validator');


const applicationSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please provide your name"],
        minLength: [3, "name must contain at least 3 character"], 
        maxLength: [30, "name cannot exceed 30 character"],
    },
    email: {
        type: String, 
        validator: [validator.isEmail, "Please provide a valid email !"],
        required: [true, "Please provide your email"], 
    }, 
    coverLetter: {
        type: String, 
        required: [true, "Please write your cover letter!"], 
    }, 
    phone: {
        type: Number, 
        required: [true, "Please provide your phone number"],
    }, 
    address: {
        type: String, 
        required: [true, "Please provide your Address"], 
    },
    resume: {
        public_id: {
            type: String, 
            required: true, 
        }, 
        url: {
            type: String, 
            required: true,
        }
    }, 
    applicationID: {
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true, 
        },
        role: {
            type: String, 
            enum: ["Job Seeker"], 
            required: true, 
        }
    }, 
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true, 
        },
        role: {
            type: String, 
            enum: ["Employer"], 
            required: true, 
        }
    }


});


const Application = mongoose.model('Application', applicationSchema);
module.exports = { Application };