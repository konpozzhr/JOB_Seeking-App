const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please provide your name"], 
        minLength: [3, "Name must contain at least 3 character!"],
        maxLength: [30, "Name cannot exceed 30 character!"],
    },
    email: {
        type: String, 
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"], 
    }, 
    phone: {
        type: Number, 
        required: [true, "Please provide your phone number!"],

    },
    password: {
        type: String, 
        required: [true, "Please provide your password"],
        minLength: [8, "Password must be contain at least 8 character"], 
        maxLength: [32, "Password cannot exceed 32 character"],
    }, 
    role: {
        type: String, 
        required: [true, "Please provide your role"],
        enum: ["Job Seeker", "Employer"], 
    },
    createAt: {
        type: Date, 
        default: Date.now(),
    }

    
});

//  HASHING USER PASSWORD
userSchema.pre("save", async (next) =>{
    if(!this.isModified("password")){
        next();
    }
    
    this.password = await bcrypt.hash(this.password, 10);
});


// Comparing USER PASSWORD
userSchema.methods.comparePassword = async (enteredPassword) =>{
    return await bcrypt.compare(enteredPassword, this.password);
}


// Generate a JWT Token for Authorization 
userSchema.methods.genJwtToken = () =>{ 
    return jwt.sign(
        {id : this._id}, 
        process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRE},
    );   
}


const User = mongoose.model('users', userSchema);
module.exports = User;



// module.exports = mongoose.model('users', userSchema);
// export const User = mongoose.model("User", userSchema);


