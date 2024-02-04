class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


const errorMiddleware = (err, req, res, next) =>{
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if(err.name === "CaseError"){
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid, Try again !`;
        err = new ErrorHandler(message, 400);
    }
    if(err.name === "TokenExpiredError"){
        const message = `Json web token is expired, Try again !`;
        err = new ErrorHandler(message, 400);
    }


    return res.status(err.statusCode).json({
        success: false, 
        message: err.message, 
        
    });

    
};

// console.log('Error middleware called');

// module.exports = errorMiddleware;
// module.exports = ErrorHandler();
// export default ErrorHandler;


module.exports = errorMiddleware;
module.exports.ErrorHandler = ErrorHandler;


// call

// const errorMiddleware = require('./path-to-error-middleware-file');
// const { ErrorHandler } = require('./path-to-error-middleware-file');
